<template>
	<text class="bg-danger text-white rounded-circle font-sm free-badge-style" :class="badgeClass" :style="badgeStyle
	">{{value}}</text>
</template>

<script>
	export default {
		props: {
			badgeClass: {
				type: String,
				default: ''
			},
			badgeStyle: {
				type: String,
				default: ''
			},
			value: {
				type: [String,Number],
				default: ''
			}
		},
		
		
	}
</script>

<style scoped>
	.free-badge-style {
		padding-left: 18rpx;
		padding-right: 18rpx;
		padding-top: 6rpx;
		padding-bottom: 6rpx;
	}
</style>
