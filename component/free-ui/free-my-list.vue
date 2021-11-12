<template>
	<view class="flex bg-white" hover-class="bg-light" :class="isUserBase ? 'py-3' : ''" @click="$emit('click')">
		<view class="flex px-3 pb-2 align-center">
			<free-avatar size="120" :src="cover" :showDotBadge="false" ></free-avatar>
		</view>
		<view class="flex-1 flex text-left  align-center justify-between" style="margin-top: -20rpx;">
			<view class="flex flex-column justify-center">
				<text class="font-lg text-dark font-weight-bold">{{userName}}</text>
				<slot>
					<text class="font text-light-muted mt-1">微信号: {{userNumber}}</text>
				</slot>
			</view>
			<view class="pr-2 flex align-center">
				<text class="iconfont text-light-muted font-md ml-1">&#xe614;</text>
				<text class="iconfont text-light-muted font-md ml-1">&#xe60c;</text>
			</view>
		</view>
	</view>
</template>

<script>
	import freeAvatar from './free-avatar.vue'
	export default {
		components: {
			freeAvatar
		},
		props: {
			isUserBase: {
				type: Boolean,
				default:false
			},
			cover: {
				type:String,
				default: ''
			},
			userName: {
				type: String,
				default: ''
			},
			userNumber: {
				type: String,
				default: ''
			}
		},
	}
</script>

<style>
</style>
