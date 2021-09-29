<template>
	<view class="flex bg-white  align-stretch" hover-class="bg-pink">
		<view class="flex px-3 py-2 align-center">
			<image :src="item.cover" mode="widthFix" style="width: 75rpx;height: 75rpx;"></image>
		</view>
		<view class="flex-1 border-bottom text-left justify-center" >
			<text class="font-md text-dark">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			},
			index: {
				type: Number,
				default: 0
			},
			showBottom: {
				type: Boolean,
				default: true
			}
		},
	}
</script>

<style>
</style>
