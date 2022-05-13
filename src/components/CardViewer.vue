<template>
<div class="big-container">
	<div class="container">
		<div :style="cardStyle" v-for="item in cardDataPagination[pageCount]" :key="item.href">
			<div class="mdui-card card">
				<div class="mdui-card-media">
					<img class="card_img" :src="item.img">
				</div>
				<div @click="navagate(item.href)" class="mdui-card-primary mdui-ripple card_title"
					style="background-color: rgba(253, 188, 199,0.5);">
					<div class="mdui-card-primary-title">{{ item.title }}</div>
					<div class="mdui-card-primary-subtitle">{{
							`${item.date.getFullYear()}.${item.date.getMonth()}.${item.date.getDate()}`
					}}</div>
					<div class="mdui-card-content">{{ item.content }}</div>
				</div>
			</div>
		</div>
	</div>
	<div class="pagination-container">
		<span class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink-accent" @click="prev"
			style="margin:4px;">上一页</span>
		<div v-for="i in totalPageCount" :key="i" class="pagination">
			<a @click="() => pageCount = i - 1"
				class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-color-pink-accent mdui-ripple" style="margin:3px;">{{
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
	async created(): Promise<void> {
		await this.$router.isReady();
		this.cardDataFilter();
		this.$watch(
			() => this.$route.params.flag,
			() => this.cardDataFilter()
		)
		this.reSize();
		window.onresize = () => this.reSize();
	}

	reSize(): void{
		if(1.7 * window.innerWidth > window.innerHeight){
			this.cardStyle = "min-width: 33%"
		}
		else{
			this.cardStyle = "min-width: 95%"
		}
	}

	cardDataFilter(): void {
		this.totalPageCount = 0;
		this.flagToView = typeof this.$route.params.flag === 'string' ? this.$route.params.flag : 'all';
		this.cardDataPagination.splice(0, this.cardDataPagination.length);
		this.cardData = this.flagToView === 'all' ? this.Data.data.sort() : this.Data.data.filter((elem) => elem.flag === this.flagToView).sort();
		for (let i = 0; i < this.cardData.length; i += this.elemPerPage) {
			this.cardDataPagination.push(this.cardData.slice(i, i + this.elemPerPage));
			this.totalPageCount++;
		}
		this.pageCount = 0;
	}

	next(): void {
		if (this.pageCount === this.totalPageCount - 1) {
			return;
		}
		else{
			this.pageCount++;
		}
	}
	prev(): void {
		if (this.pageCount === 0) {
			return;
		}
		else{
			this.pageCount--;
		}
	}

	navagate(href: string): void {
		setTimeout(() =>
			this.$router.push(href)
		,250)
	}
}
</script>

<style>
.big-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: absolute;
  z-index: -1;
  top: 50px;
  min-width: 70vw;
  margin: 20px auto;
  padding-left: 5vw;
  padding-right: 0;
  padding-bottom: 30px;
  justify-content: center;
}

.container {
  display: flex;
  z-index: -100000;
  flex-wrap: wrap;
  align-items: center;
  font-family: 'Quicksand', sans-serif;
}

.card_img {
  height: auto;
}

.pagination-container{
	padding-top:10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.pagination{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.card {
    margin: 10px;
}
</style>