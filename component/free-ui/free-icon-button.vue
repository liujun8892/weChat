<template>
	<view class="flex align-center justify-center" hover-class="bg-hover-light" style="width: 90rpx;height: 90rpx;" @click="$emit('click')">
		<text class="iconfont font-md">{{icon}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String
			}
		},
		mounted() {
			console.log(this.icon,'icon...');
		}
	}
</script>

<style>
</style>
