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
				<text class="iconfont font-md  position-absolute chat-left-icon text-white" v-if="item.type != 'emotion'">&#xe609;</text>
				<free-avatar :src="item.avatar" size="70"></free-avatar>
				<text class="p-2 rounded bg-white ml-3 font-md" style="max-width: 500rpx;">{{item.data}}</text>
				<text class="p-2 rounded  mr-3 font-md  " style="max-width: 500rpx;" v-if="item.type == 'emotion'">
					<image :src="item.data" mode="widthFix" style="width: 300rpx;height: 300rpx;" lazy-load></image>
				</text>
			</view>
			<!-- 自己 -->
			<view class="flex align-start justify-end mt-3" :key="index" v-else @longpress="handleLongPress">
				<text class="iconfont font-md  position-absolute text-chat-item chat-right-icon" v-if="item.type == 'text'">&#xe640;</text>
				<text class="p-2 rounded  mr-3 font-md bg-chat-item " style="max-width: 500rpx;" v-if="item.type == 'text'">{{item.data}}</text>
				<text class="p-2 rounded  mr-3 font-md  " style="max-width: 500rpx;" v-else>
					<image :src="item.data" mode="widthFix" class="rounded" style="width: 300rpx;height: 300rpx;" lazy-load></image>
				</text>
				<free-avatar :src="item.avatar" size="70" ></free-avatar>
			</view>
		</template>
	</view>
</template>

<script>
	import freeAvatar from '@/component/free-ui/free-avatar.vue'
	import $T from "@/common/free-lib/time.js"
	// #ifdef APP-PLUS-NVUE
	let animation = weex.requireModule('animation')
	// #endif
	export default {
		components: {
			freeAvatar
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

			}
		},
		mounted() {
			this.$watch('item.isRemove',(newValue,oldValue) => {
				if(newValue) {
					this.showRemoveAnimation()
				}
			})
		},
		methods: {
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
