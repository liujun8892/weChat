<template>
	<view  style="z-index:9999;overflow: hidden; left: 0;right: 0;top: 0;bottom: 0;position: fixed;" v-if="popupShow" @click.stop="handleNoMaskHide">
		<view style="position: fixed;background-color:rgba(0,0,0,0.5); left: 0;right: 0;top: 0;bottom: 0;" @click="hidePopup" v-if="maskShow"> 
		</view>
		<view :class="getContentClass" style="position: fixed;background-color: #FFFFFF;z-index: 99999;" :style="getContentStyle" ref='popContent'>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS-NVUE
	let animation = weex.requireModule('animation')
	// #endif
	export default {
		computed: {
			getContentStyle() {
				return !this.positionBottom ? `left: ${this.left}px;top: ${this.top}px;overflow: hidden;` : `bottom: 0;left:0;right:0;`
			},
			getContentClass() {
				return !this.positionBottom ? `rounded border animate-popup` : ''
			}
		},
		props: {
			maskShow: {
				type: Boolean,
				default: true
			},
			positionBottom: {
				type: Boolean,
				default: false
			},
			contentWidth: {
				type: Number,
				default: 0
			},
			contentHeight: {
				type: Number,
				default: 0
			},
			hideOrigin: {
				type: String,
				default: 'left top'
			}
		},
		data() {
			return {
				left: 0,
				top: 0,
				popupShow: false,
				maxX: 0,
				maxY: 0,
			}
		},
		methods:{
			showPopup(x,y) {
				let systemInfo = uni.getSystemInfoSync()
				this.maxX = systemInfo.windowWidth - uni.upx2px(this.contentWidth)
				this.maxY = systemInfo.windowHeight - uni.upx2px(this.contentHeight)
				this.left =x > this.maxX ? this.maxX : x
				this.top = y > this.maxY ? this.maxY : y
				this.popupShow = true
				// #ifdef APP-PLUS-NVUE
				this.showPopupAnimation()
				// #endif
			},
			showPopupAnimation() {
				this.$nextTick(()=>{
					setTimeout(() => {
						animation.transition(this.$refs.popContent, {
						    styles: {
						        transform: 'scale(1)',
								// transformOrigin: 'left top', // 加了位置不对
								opacity: 1,
						    },
						    duration: 100, //ms
						    timingFunction: 'ease',
						    },res => {
								console.log(res,'动画显示成功...');
							})
					},10)
				})
			},
			hidePopup() {
				
				// #ifdef APP-PLUS-NVUE
				this.hidePopupAnimation()
				// #endif
				// #ifndef APP-PLUS-NVUE
				this.popupShow = false
				// #endif
			},
			hidePopupAnimation() {
				this.$nextTick(()=>{
					setTimeout(() => {
						animation.transition(this.$refs.popContent, {
						    styles: {
						        transform: 'scale(0)',
								transformOrigin: this.hideOrigin, // 加了位置不对
								opacity: 0,
						    },
						    duration: 200, //ms
						    timingFunction: 'ease',
						    },res => {
								this.popupShow = false
								console.log(res,'动画隐藏成功...');
							})
					},10)
				})
			},
			handleNoMaskHide() {
				console.log(7777);
				if(!this.maskShow){
					this.hidePopup()
				}
			}
		}
	}
</script>

<style scoped>
	.animate-popup {
		/* #ifdef APP-PLUS-NVUE */
		transform: scale(0);
		opacity: 0;
		/* #endif */
	}
</style>
