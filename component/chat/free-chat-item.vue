<template>
	<view>
		<!-- 聊天时间 -->
		<view class="flex align-center justify-center" v-if="showTime">
			<text class="font-sm pt-4 pb-2">{{this.showTime}}</text>
		</view>
		<!-- 撤回 -->
		<view class="flex align-center justify-center" :class="{'animate-popup': item.isAnimation}"  ref="remove" v-if="item.isRemove">
			<text class="font-sm pt-4 pb-2">你撤回了一条消息</text>
		</view>
		<template v-else>
			<!-- 别人 -->
			<view class="flex align-start justify-start position-relative" :key="index" v-if="!isSelf"
				@longpress="handleLongPress">
				<text class="iconfont font-md  position-absolute chat-left-icon text-white" v-if="item.type == 'text' || item.type == 'audio'">&#xe609;</text>
				<free-avatar :src="item.avatar" size="70"></free-avatar>
				<text class="p-2 rounded bg-white ml-3 font-md" style="max-width: 500rpx;" v-if="item.type == 'text'">{{item.data}}</text>
				<text class="p-2 rounded  mr-3 font-md bg-chat-item font" style="max-width: 500rpx;" v-if="item.type == 'audio'">4'</text>
				<text class="p-2 rounded  mr-3 font-md  " style="max-width: 500rpx;" v-if="item.type == 'emotion' || item.type == 'image'" @click="previewImg">
					<image :src="item.data" mode="widthFix" style="width: 300rpx;height: 300rpx;" lazy-load></image>
				</text>
			</view>
			<!-- 自己 -->
			<view class="flex align-start justify-end mt-3" :key="index" v-else @longpress="handleLongPress">
				<text class="iconfont font-md  position-absolute text-chat-item chat-right-icon" v-if="item.type == 'text' || item.type == 'audio'">&#xe640;</text>
				<text class="p-2 rounded  mr-3 font-md bg-chat-item " style="max-width: 500rpx;" v-if="item.type == 'text'">{{item.data}}</text>
				<text class="p-2 rounded  mr-3 font-md bg-chat-item font" style="max-width: 500rpx;" v-if="item.type == 'audio'" @click="audioPlayer">4'</text>
				<text class="p-2 rounded  mr-3 font-md  " style="max-width: 500rpx;" v-if="item.type == 'emotion' || item.type == 'image'" @click="previewImg">
					<free-image :src='item.data'></free-image>
				</text>
				
				<free-avatar :src="item.avatar" size="70" ></free-avatar>
			</view>
		</template>
	</view>
</template>

<script>
	import freeAvatar from '@/component/free-ui/free-avatar.vue'
	import $T from "@/common/free-lib/time.js"
	import freeImage from '@/component/free-ui/free-image.vue'
	import {mapActions} from 'vuex'
	// #ifdef APP-PLUS-NVUE
	let animation = weex.requireModule('animation')
	// #endif
	export default {
		components: {
			freeAvatar,
			freeImage
		},
		props: {
			item: {
				type: Object,
				default: () => ({})
			},
			index: {
				type: Number,
				default: 0
			},
			// 上一条消息的时间
			proTime: {
				type: Number,
				default: 0
			}
		},
		computed: {
			isSelf() {
				return this.item.id === 1
			},
			showTime() {
				return $T.getChatTime(this.item.create_time, this.proTime)
			}
		},
		data() {
			return {
				w: '',
				h: '',
				innerAudioContext:null,
			}
		},
		mounted() {
			this.$watch('item.isRemove',(newValue,oldValue) => {
				if(newValue) {
					this.showRemoveAnimation()
				}
			})
			if(this.item.type === 'audio') {
				this.$on(this.onAduioEvent)
				// this.$store.dispatch('$on',(res)=>{console.log(res,'3333');})
			}
		},
		destroyed() {
			if(this.item.type === 'audio') {
				// this.$off(this.onAduioEvent)
				// this.$store.dispatch('$off',this.onAduioEvent)
				this.$off(this.onAduioEvent)
			}
			if(this.innerAudioContext) {
				this.innerAudioContext.destroy()
				this.innerAudioContext = null
			}
		},
		methods: {
			...mapActions(['$on','$emit','$off']),
			// 监听音频事件
			onAduioEvent(index) {
				if(this.innerAudioContext) {
					if(index !== this.index) {
						this.innerAudioContext.stop()
					}
				}
				console.log(index,'3333');
			},
			// 播放音频
			audioPlayer() {
				console.log(this.item.data,'播放音频...');
				// this.$store.dispatch('$emit',this.index)
				this.$emit(this.index)
				if(!this.innerAudioContext){
					this.innerAudioContext = uni.createInnerAudioContext();
					this.innerAudioContext.autoplay = true;
					this.innerAudioContext.src = this.item.data;
					this.innerAudioContext.play()
				} else {
					this.innerAudioContext.stop()
					// this.innerAudioContext.src = this.item.data;
					this.innerAudioContext.play()
				}
				
			},
			// 预览图片
			previewImg() {
				console.log(this.item,this.index,'预览');
				this.$emit('previewImg',this.item.data)
			},
			handleLongPress(e) {
				// console.log(e,'33333');
				let x = 0
				let y = 0
				if (e.touches && Array.isArray(e.touches) && e.touches.length > 0) {
					x = e.touches[0].pageX
					y = e.touches[0].pageY
				}
				this.$emit('long', {
					x,
					y,
					index: this.index
				})
			},
			showRemoveAnimation() {
				this.$nextTick(()=>{
					setTimeout(() => {
						animation.transition(this.$refs.remove, {
						    styles: {
								// transformOrigin: 'left top', // 加了位置不对
								opacity: 1,
						    },
						    duration: 500, //ms
						    timingFunction: 'ease',
						    },res => {
								console.log(res,'动画显示成功...');
							})
					},10)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.chat-left-icon {
		left: 80rpx;
		top: 20rpx;
	}

	.chat-right-icon {
		right: 80rpx;
		top: 20rpx;
	}
	
	.animate-popup {
		/* #ifdef APP-PLUS-NVUE */
		opacity: 0;
		/* #endif */
	}
</style>
