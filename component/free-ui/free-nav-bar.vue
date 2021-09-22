<template>
	<view >
		<!-- 导航栏 -->
		<view class="nav-bar bg-light " :class="{'fixed-top': isFixed}">
			<view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
			<view class="w-100 flex align-center justify-between" style="height: 90rpx;">
				<view class="ml-3">
					<text class="font-md" v-if="isTitleShow">{{title}}</text>
				</view>
				<view class="flex align-center">
					<free-icon-button :icon="'\ue6e3'"></free-icon-button>
					<free-icon-button :icon="'\ue682'"></free-icon-button>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view  :style="{height: placeHolderHeight + 'px'}" v-if="isFixed"></view>
	</view>
	
</template>

<script>
	import freeIconButton from './free-icon-button.vue'
	export default {
		components: {
			freeIconButton
		},
		props: {
			isTitleShow: {
				type: Boolean,
				default:true
			},
			title: {
				type: String,
				default: ''
			},
			isFixed: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				statusBarHeight: 0,
				placeHolderHeight: 0,
			}
		},
		mounted() {
			// #ifdef APP-PLUS-NVUE
			this.statusBarHeight = plus.navigator.getStatusbarHeight()
			console.log(this.statusBarHeight,'statusBarHeight');
			// #endif
			this.placeHolderHeight = this.statusBarHeight + uni.upx2px(90)
		}
		
	}
</script>

<style>
</style>
