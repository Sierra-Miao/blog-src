<template>
	<div class="big-container">
		<div :style="gridResponsiveLayout" class="container">
			<div class="mdui-card card" v-for="item in cardDataPagination[pageCount]"
				:key="item.href">
				<div class="mdui-card-media">
					<img class="card_img" :src="item.img">
				</div>
				<div @click="navagate(item.href)" class="mdui-card-primary mdui-ripple card_title"
					style="background-color: rgba(253, 188, 199,0.5);">
					<div class="mdui-card-primary-title">{{ item.title }}</div>
					<div v-if="isNotHuabook" class="mdui-card-primary-subtitle">{{
							`${item.date.getFullYear()}.${item.date.getMonth() + 1}.${item.date.getDate()}`
					}}</div>
					<div v-else class="mdui-card-primary-subtitle">{{
							item.star
					}}</div>
					<div class="mdui-card-content">{{ item.content }}</div>
				</div>
			</div>
		</div>
		<div class="pagination-container">
			<span class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink-accent" @click="prev"
				style="margin:4px;">上一页</span>
			<div v-for="i in totalPageCount" :key="i" class="pagination">
				<a @click="() => pageCount = i - 1"
					class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-color-pink-accent mdui-ripple"
					style="margin:3px;">{{
							i
					}}</a>
			</div>
			<span class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink-accent" @click="next"
				style="margin:4px;">下一页</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { cardInfo } from '@/main';
import constData from '@/data'
export default class CardViewer extends Vue {
	private Data = new constData();
	public cardData: Array<cardInfo> = new Array<cardInfo>();
	public cardDataPagination: Array<Array<cardInfo>> = new Array<Array<cardInfo>>();
	public flagToView = "";
	public elemPerPage = 12;
	public totalPageCount = 0;
	public pageCount = 0;
	public cardStyle = "min-width: 33%";
	public isNotHuabook = true;
	public gridResponsiveLayout = "grid-template-columns: repeat(3, 33.3%);";
	async created(): Promise<void> {
		await this.$router.isReady();
		this.cardDataFilter();
		this.$watch(
			() => this.$route.params.flag,
			() => this.cardDataFilter()
		)
		this.ResponsiveLayout()
		window.onresize = () => this.ResponsiveLayout();
	}

	ResponsiveLayout(): void{
		let width = window.innerWidth;
		let height = window.innerHeight;
		if(1.6 * width < height){
			this.gridResponsiveLayout = "grid-template-columns: 100%"
		}
		else if(width < 1.1 * height){
			this.gridResponsiveLayout = "grid-template-columns: repeat(2, 50%);"
		}
		else{
			this.gridResponsiveLayout = "grid-template-columns: repeat(3, 33.3%);"
		}
	}

	cardDataFilter(): void {
		this.totalPageCount = 0;
		this.flagToView = typeof this.$route.params.flag === 'string' ? this.$route.params.flag : 'all';
		this.cardDataPagination.splice(0, this.cardDataPagination.length);
		this.cardData = this.flagToView === 'all' ? this.Data.data.filter((elem) => elem.area === "Blog").sort((a,b) => b.valueOf() - a.valueOf()) : this.Data.data.filter((elem) => elem.flag === this.flagToView).sort((a,b) => b.valueOf() - a.valueOf());
		for (let i = 0; i < this.cardData.length; i += this.elemPerPage) {
			this.cardDataPagination.push(this.cardData.slice(i, i + this.elemPerPage));
			this.totalPageCount++;
		}
		this.pageCount = 0;
		if(this.cardData.some(elem => elem.flag === "滑滑乱翻书")){
			this.isNotHuabook = false;
		}
		else{
			this.isNotHuabook = true;
		}
	}

	next(): void {
		if (this.pageCount === this.totalPageCount - 1) {
			return;
		}
		else {
			this.pageCount++;
		}
	}
	prev(): void {
		if (this.pageCount === 0) {
			return;
		}
		else {
			this.pageCount--;
		}
	}

	navagate(href: string): void {
		setTimeout(() =>
			this.$router.push(href)
			, 250)
	}
}
</script>

<style scoped>
.big-container{
	position:relative;
	margin-top:1.5rem;
	width:100%;
	display:flex;
	flex-direction:column;
	align-items: center;
}
.container{
	display:grid;
	width:calc(100% - 2rem);
	max-width:60rem;
	padding: 0 1rem;
	border-style:none;
}
.card{
	margin: 0.5rem;
	align-self: start;
}
.pagination-container {
	padding-top: 2vh;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.pagination {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
}

</style>