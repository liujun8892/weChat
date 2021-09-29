<template>
	<view class="flex align-stretch" @click="$emit('click')"  :class="item.isTop ? 'bg-light' : 'bg-white'" @longpress="handleLongPress" hover-class="bg-light">
		<view class="flex align-center justify-center position-relative " style="width: 145rpx;">
			<free-avatar :src="item.avatar" :size="92" class=""></free-avatar>
			<free-badge :badgeClass="'position-absolute'" :badgeStyle="'top: 15rpx;right: 15rpx;'" :value="item.noreadnum" v-if="item.noreadnum"></free-badge>
		</view>
		<view
			class="flex-1 flex justify-center flex-column py-3 pr-3  justify-start border-bottom border-light-secondary">
			<view class="flex align-center justify-between mb-1">
				<text class="font-md">{{item.nickname}}</text>
				<text class="font-sm text-light-muted">{{item.update_time | formatTime}}</text>
			</view>
			<text class="font text-light-muted text-ellipsis">{{item.data}}</text>
		</view>
	</view>
</template>

<script>
	import freeAvatar from '@/component/free-ui/free-avatar.vue'
	import freeBadge from '@/component/free-ui/free-badge.vue'
	import freeBase from '@/common/mixin/free-base.js'
	import $Time from '@/common/free-lib/time.js'
	export default {
		mixins:[freeBase],
		components: {
			freeAvatar,
			freeBadge
		},
		 props: {
			 item:Object,
			 index: Number
		 },
		 methods: {
			 handleLongPress(e) {
				 console.log(e,'7777');
				 let x = 0
				 let y = 0
				 if(e.touches && Array.isArray(e.touches) && e.touches.length > 0) {
					 x = e.touches[0].pageX
					 y = e.touches[0].pageY
				 }
				 console.log(x,y,'坐标....');
				 console.log(this.index,'index...');
				 this.$emit('long',{x,y,index: this.index})
			 }
		 }
	}
</script>

<style>
</style>
