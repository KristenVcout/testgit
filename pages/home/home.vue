<template>
	<view>
		<!-- 轮播图的区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=` + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
			<!-- 			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item> -->
		</swiper>

		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img">
				</image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<!-- 楼层的容器 -->
		<view class="floor-list">
			<!-- 每个楼层的item项 -->
			<view class="floor-item" v-for="(item,i) in floorList" :key='i'>
				<!-- 楼层的标题-->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左边大图图像 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix">

						</image>
					</navigator>

					<!-- 右边小图图像 -->
					<view class="rigt-img-box">

						<navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key='i2' v-if="i2!==0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>

					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				//这是轮播图的数据列表
				swiperList: [],
				// 分类导航的数据列表
				navList: [],
				//楼层数据
				floorList: []
			};
		},
		onLoad() {
			//调用方法，获取轮播图的数据
			this.getSwiperList()
			//调用方法，获取分类导航的数据
			this.getNavList()
			//调用方法，获取楼层数据
			this.getFloorList()
		},
		//自定义方法部分
		methods: {
			//轮播图
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				//const res = await uni.$http.get('/api/public/v1/home/swiperdata')
				console.log('轮播图')
				console.log(res)
				//请求失败
				if (res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
				uni.$showMsg('轮播图数据请求成功！', 4000)
			},
			//分类导航
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				console.log('分类导航')
				console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
				uni.$showMsg('导航栏数据请求成功!', 1000)
			},
			//楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				console.log('楼层数据')
				console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()
				//对楼层数据进行处理
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
				uni.$showMsg('楼层数据请求成功！', 1000)

			},
			//分类跳转
			navClickHandler(item) {
				console.log(item)
				if (item.name === '分类')
					uni.switchTab({
						url: '/pages/cate/cate'
					})
			},


			//自定义方法部分
		},
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
	}

	.nav-img {
		width: 128rpx;
		height: 140rpx;
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}

	.rigt-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}
</style>
