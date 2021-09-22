<template>
	<image :src="src" mode="widthFix" :style="{width: size + 'rpx', height: size + 'rpx'}" :class="type"></image>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			size: {
				type: [Number, String],
				default: 90
			},
			type: {
				type: String,
				default: 'rounded'
			}
		},
	}
</script>

<style>

</style>
