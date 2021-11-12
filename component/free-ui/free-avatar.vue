<template>
	<view class="position-relative" @click="handleAvatarEvent">
		<image :src="src" mode="widthFix" :style="{width: size + 'rpx', height: size + 'rpx'}" :class="type"></image>
		<text class="rounded-circle bg-danger position-absolute"
			style="width: 20rpx;height: 20rpx;top: -10rpx;right: -10rpx;" v-if="showDotBadge"></text>
	</view>
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
			},
			showDotBadge: {
				type: Boolean,
				default: false
			},
			avatarType: {
				type: String,
				default: ''
			}
		},
		methods: {
			handleAvatarEvent() {
				console.log(this.avatarType,'7888');
				switch (this.avatarType) {
					case 'navigate':
						console.log('跳。。。');
						uni.navigateTo({
							url: '../../pages/mail/userBase/userBase'
						});
						break;
					default:
						this.$emit('click')
						break;
				}
			}
		}
	}
</script>

<style>

</style>
