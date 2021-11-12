<template>
	<view class="flex bg-white  align-stretch" hover-class="bg-pink">
		<view class="flex px-3 py-2 align-center">
			<text class="iconfont font-lg">{{item.icon}}</text>
		</view>
		<view class="flex-1 flex text-left align-center justify-between py-2"  :class="isBoderBottom ? 'border-bottom' : ''">
			<view class="flex align-center">
				<text class="font-md text-dark" :style="item.icon ? ''  : 'transform: translateX(-20rpx);'">{{item.name}}</text>
				<slot></slot>
			</view>
			<view class="pr-2 flex align-center" v-if="isShowRight">
				<free-avatar size="55" :src="item.avatar" :showDotBadge="true" v-if="item.avatar"></free-avatar>
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
			isBoderBottom: {
				type: Boolean,
				default: true
			},
			isShowRight: {
				type: Boolean,
				default:true
			},
			isShowArrrow: {
				type: Boolean,
				default: false
			},
			icon: {
				type: String,
				default: ''
			},
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
