<template>
	<view class="flex bg-white  align-stretch" hover-class="bg-pink">
		<view class="flex px-3 py-2 align-center">
			<text class="iconfont font-lg">{{item.icon}}</text>
		</view>
		<view class="flex-1 flex border-bottom text-left align-center justify-between" >
			<text class="font-md text-dark">{{item.name}}</text>
			<view class="pr-2 flex align-center">
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
