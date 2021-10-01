<template>
	<view style="z-index:9999;overflow: hidden;" v-if="popupShow">
		<view style="position: fixed;background-color:rgba(0,0,0,0.5); left: 0;right: 0;top: 0;bottom: 0;" @click="hidePopup" v-if="maskShow"> 
		</view>
		<view :class="getContentClass" style="position: fixed;background-color: #FFFFFF;" :style="getContentStyle">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			getContentStyle() {
				return !this.positionBottom ? `left: ${this.left}px;top: ${this.top}px` : `bottom: 0;left:0;right:0;`
			},
			getContentClass() {
				return !this.positionBottom ? `rounded border` : ''
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
			}
		},
		data() {
			return {
				left: 0,
				top: 0,
				popupShow: false
			}
		},
		methods:{
			showPopup(x,y) {
				this.left =x
				this.top = y
				this.popupShow = true
			},
			hidePopup() {
				this.popupShow = false
			},
		}
	}
</script>

<style>
</style>
