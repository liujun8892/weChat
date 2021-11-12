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
			<view class="flex align-start justify-start position-relative mt-3" :key="index" v-if="!isSelf"
				@longpress="handleLongPress">
				<text class="iconfont font-md  position-absolute chat-left-icon text-white" v-if="item.type == 'text' || item.type == 'audio'">&#xe609;</text>
				<free-avatar :src="item.avatar" size="70" avatarType="navigate"></free-avatar>
				<text class="p-2 rounded bg-white ml-3 font-md" style="max-width: 500rpx;" v-if="item.type == 'text'">{{item.data}}</text>
				<text class="p-2 rounded bg-white ml-3 font-md flex align-center" style="max-width: 500rpx;" v-if="item.type == 'audio'" @click="audioPlayer">
					<text :style="audioChatBoxStyle">{{item.options.time}}"</text>
						<image class="mx-1" style="width: 50rpx;height: 50rpx;" :src="isStop ?'/static/audio/play.gif':  '/static/audio/audio3.png' " mode=""></image>
				</text>
				<text class="p-2 rounded  mr-3 font-md  " style="max-width: 500rpx;" v-if="item.type == 'emotion' || item.type == 'image'" @click="previewImg">
					<image :src="item.data" mode="widthFix" style="width: 300rpx;height: 300rpx;" lazy-load></image>
				</text>
				<view class="position-relative rounded" v-if="item.type == 'video'">
					<free-image :src="item.options.poster" @loaded="handImgLoaded"></free-image>
					<text class="iconfont text-white position-absolute text-center" style="font-size: 80rpx; width: 80rpx;height: 80rpx;line-height: 80rpx;" :style="videoControlStyle">&#xe737;</text>
				</view>
			</view>
			<!-- 自己 -->
			<view class="flex align-start justify-end mt-3" :key="index" v-else @longpress="handleLongPress">
				<text class="iconfont font-md  position-absolute text-chat-item chat-right-icon" v-if="item.type == 'text' || item.type == 'audio'">&#xe640;</text>
				<text class="p-2 rounded  mr-3 font-md bg-chat-item " style="max-width: 500rpx;" v-if="item.type == 'text'">{{item.data}}</text>
				
				<text class="p-2 rounded  mr-3 font-md bg-chat-item font flex align-center" style="max-width: 500rpx;" v-if="item.type == 'audio'" @click="audioPlayer">
					<image class="mx-1" style="width: 50rpx;height: 50rpx;" :src="isStop ?'/static/audio/play.gif':  '/static/audio/audio3.png' " mode=""></image>
					<text :style="audioChatBoxStyle">{{item.options.time}}"</text>
					
				</text>
					
				<text class="p-2 rounded  mr-3 font-md  " style="max-width: 500rpx;" v-if="item.type == 'emotion' || item.type == 'image'" @click="previewImg">
					<free-image :src='item.data'></free-image>
				</text>
				
				<view class="position-relative rounded" v-if="item.type == 'video'" @click="goPalyVideo(item)">
					<free-image :src="item.options.poster" @loaded="handImgLoaded" :maxWidth="300"></free-image>
					<text class="iconfont text-white position-absolute text-center" style="font-size: 80rpx; width: 80rpx;height: 80rpx;line-height: 80rpx;" :style="videoControlStyle">&#xe737;</text>
				</view>
				
				<free-avatar :src="item.avatar" size="70" avatarType="navigate"></free-avatar>
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
			audioChatBoxStyle() {
				if(this.item.type == 'audio') {
					let time = this.item.options.time || 0
					let W = time / (60 / 500)
					W = W < 150 ? 150 : W
					return `width: ${W}rpx;`
				}
			},
			isSelf() {
				return this.item.id === 1
			},
			showTime() {
				return $T.getChatTime(this.item.create_time, this.proTime)
			},
			videoControlStyle() {
				let style = ''
				if(this.imgW && this.imgH) {
					let left = this.imgW / 2 - uni.upx2px(80) / 2
					let top = this.imgH / 2 - uni.upx2px(80) / 2
					style = `left: ${left}px;;top: ${top}px;`
				}
				return style
			}
		},
		data() {
			return {
				w: '',
				h: '',
				innerAudioContext:null,
				isStop:false,
				imgW: '',
				imgH: '',
			}
		},
		mounted() {
			this.$watch('item.isRemove',(newValue,oldValue) => {
				if(newValue) {
					this.showRemoveAnimation()
				}
			})
			if(this.item.type === 'audio') {
				this.audioOn(this.onAduioEvent)
				// this.$store.dispatch('$on',(res)=>{console.log(res,'3333');})
			}
		},
		destroyed() {
			if(this.item.type === 'audio') {
				// this.$off(this.onAduioEvent)
				// this.$store.dispatch('$off',this.onAduioEvent)
				this.audioOff(this.onAduioEvent)
			}
			if(this.innerAudioContext) {
				this.innerAudioContext.destroy()
				this.innerAudioContext = null
			}
		},
		methods: {
			...mapActions(['audioOn','audioEmit','audioOff']),
			// 播放视频
			goPalyVideo(item) {
				uni.navigateTo({
					url: `/pages/video/video?url=${item.data}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 处理自适应图片的宽高
			handImgLoaded(e) {
				this.imgW = e.w
				this.imgH = e.h
			},
			// 监听音频事件
			onAduioEvent(index) {
				if(this.innerAudioContext) {
					if(index !== this.index) {
						this.innerAudioContext.pause()
					}
				}
				console.log(index,'3333');
			},
			// 播放音频
			audioPlayer() {
				console.log(this.item.data,'播放音频...');
				// this.$store.dispatch('$emit',this.index)
				this.audioEmit(this.index)
				if(!this.innerAudioContext){
					this.innerAudioContext = uni.createInnerAudioContext();
					this.innerAudioContext.autoplay = true;
					this.innerAudioContext.src = this.item.data;
					this.innerAudioContext.play()
					this.innerAudioContext.onPlay(() => {
						this.isStop = true
					})
					this.innerAudioContext.onPause(() => {
						this.isStop = false
					})
					this.innerAudioContext.onStop(() => {
						this.isStop = false
					})
					this.innerAudioContext.onError(() => {
						this.isStop = false
					})
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
