<template>
	<view >
		<!-- 导航栏 -->
		<view class="nav-bar bg-light" :class="{'fixed-top': isFixed, 'bg-white': bgWhite}">
			<view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
			<view class="w-100 flex align-center justify-between" style="height: 90rpx;">
				<view class="flex align-center">
					<free-icon-button :icon="'\ue60d'"  @click="goBack" v-if="showBack"></free-icon-button>
					<text class="font-md ml-3" v-if="isTitleShow">{{getMsgText}}</text>
				</view>
				<view class="flex align-center">
					<slot name="rightIcon">
						<free-icon-button :icon="'\ue6e3'"  @click="search"></free-icon-button>
						<free-icon-button :icon="'\ue682'" @click="extend"></free-icon-button>
					</slot>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view  :style="{height: placeHolderHeight + 'px'}" v-if="isFixed"></view>
		<!-- 扩展弹框 -->
		<!-- 弹出组件 -->
		<free-popup ref="popup" :contentWidth="320" :contentHeight="getChatPopHeight" :maskShow="false" hideOrigin="right top">
			<view class="flex flex-column bg-dark" style="width: 320rpx;" :style="{height: getChatPopHeight + 'rpx'}">
				<view class="flex-1 flex align-center" hover-class="bg-hover-dark" v-for="(item,index) in extendsOptionsList" :key="index" @click="handMenu($event,item.event)">
					<text class="iconfont pl-3 pr-2 font-md text-white">{{item.icon}}</text>
					<text class="font-md  text-white">{{item.name}}</text>
				</view>
			</view>
		</free-popup>
	</view>
	
</template>

<script>
	import freeIconButton from './free-icon-button.vue'
	import freePopup from '@/component/free-ui/free-popup.vue'
	export default {
		components: {
			freeIconButton,
			freePopup
		},
		computed: {
			getMsgText() {
				return this.msgCount > 0 ? `${this.title}(${this.msgCount})` : `${this.title}` 
			},
			getChatPopHeight() {
				let H = 100
				return this.extendsOptionsList.length * H 
			}
		},
		props: {
			showBack: {
				type: Boolean,
				default:false
			},
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
			},
			msgCount: {
				type: Number,
				default: 0
			},
			bgWhite: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				statusBarHeight: 0,
				placeHolderHeight: 0,
				extendsOptionsList: [
					{
						name: '发起群聊',
						event: '',
						icon: '\ue633'
					},
					{
						name: '添加好友',
						event: '',
						icon: '\ue65d'
					},
					{
						name: '扫一扫',
						event: '',
						icon: '\ue614'
					},
					{
						name: '收付款',
						event: '',
						icon: '\ue66c'
					},
					{
						name: '帮助与反馈',
						event: '',
						icon: '\ue613'
					},
				]
			}
		},
		mounted() {
			// #ifdef APP-PLUS-NVUE
			this.statusBarHeight = plus.navigator.getStatusbarHeight()
			console.log(this.statusBarHeight,'statusBarHeight');
			// #endif
			this.placeHolderHeight = this.statusBarHeight + uni.upx2px(90)
		},
		methods:{
			getPlaceHolderHeight() {
				return this.placeHolderHeight
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			handMenu(e) {
				e.stopPropagation();
				console.log(e,5555);
				// console.log(eventName,'444');
			},
			search() {
				this.$emit('search')
			},
			extend(e) {
				console.log(e,'extend...');
				this.$emit('extend')
			},
			showPopup() {
				this.$refs.popup.showPopup(700,this.placeHolderHeight)
			},
			hidePopup() {
				this.$refs.popup.hidePopup()
			}
		}
		
	}
</script>

<style>
</style>
