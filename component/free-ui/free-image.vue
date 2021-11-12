<template>
	<view>
		<image :src="src" mode="widthFix" :class="styleClass" :style="{width: w + 'px',height: h + 'px'}" lazy-load @load="handImageLoad"></image>
	</view>
</template>

<script>
	export default {
		props: {
			// 图片路径
			src: {
				type: String,
				default:''
			},
			// 最大宽度
			maxWidth: {
				type: String,
				default: 500
			},
			// 最大高度
			maxHeight:{
				type: String,
				default: 350
			},
			styleClass: {
				type: String,
				default: 'rounded'
			}
		},
		data() {
			return {
				w: '',
				h: ''
			}
		},
		methods: {
			// 处理图片加载
			handImageLoad(e) {
				let width = e.detail.width
				let height = e.detail.height
				let maxW = uni.upx2px(this.maxWidth)
				let maxH = uni.upx2px(this.maxHeight)
				if(height <= maxH) {
					this.h = height
					this.w = width > maxW ? maxW : width
					this.$emit('loaded',{
						w:this.w,
						h:this.h
					})
					return
				}
				this.h = maxH
				let _w = maxH *  (width / height)
				this.w = _w > maxW ?maxW : _w
				this.$emit('loaded',{
					w:this.w,
					h:this.h
				})
			},
		}
	}
</script>

<style>
</style>
