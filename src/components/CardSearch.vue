<template>
	<div class="big-container">
		<div style="min-width: 50%;display:flex;flex-direction: column;align-items: center;">
			<div class="mdui-textfield mdui-textfield-expandable mdui-float-right" style="z-index: 0;">
				<button class="mdui-textfield-icon mdui-btn mdui-btn-icon">
					<i class="mdui-icon material-icons">search</i>
				</button>
				<input v-model="searchWords" class="mdui-textfield-input" type="text" placeholder="输入标题、日期或简介来搜索……" />
				<button class="mdui-textfield-close mdui-btn mdui-btn-icon">
					<i class="mdui-icon material-icons">close</i>
				</button>
			</div>
		</div>
		<div class="container">
			<div :style="cardStyle" class="mdui-card card" v-for="item in searchResult" :key="item.href">
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
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { cardInfo } from '@/main';
import constData from '@/data'
export default class CardViewer extends Vue {
	private Data = new constData().data.filter((elem) => elem.area === "Blog").sort();
	public searchResult: Array<cardInfo> = new Array<cardInfo>();
	public cardStyle = "min-width: 33%";
	public searchWords = "";
	async created(): Promise<void> {
		await this.$router.isReady();
		this.$watch(
			() => this.searchWords,
			() => {
				if (!this.isNullOrEmpty(this.searchWords)) {
					this.searchResult = this.Data.filter((elem) => this.cardDataSearch(elem,this.searchWords));
				}
				else{
					this.searchResult.splice(0,this.searchResult.length);
				}
			}
		);
		this.reSize();
		window.onresize = () => this.reSize();
	}

	isNullOrEmpty(str: string): boolean {
		return (!str || /^\s*$/.test(str));
	}

	cardDataSearch(elem: cardInfo, toSearch: string): boolean {
		return (elem.title.indexOf(toSearch) !== -1 || elem.content.indexOf(toSearch) !== -1 || `${elem.date.getFullYear()}.${elem.date.getMonth()}.${elem.date.getDate()}`.indexOf(toSearch) !== -1)
	}

	reSize(): void {
		if (1.6 * window.innerWidth > window.innerHeight) {
			this.cardStyle = "width: 31%"
		}
		else {
			this.cardStyle = "min-width: 95%"
		}
	}


	navagate(href: string): void {
		setTimeout(() =>
			this.$router.push(href)
			, 250)
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
	min-width: 59%;
	margin: 20px auto;
	padding-left: 10%;
	padding-right: 10%;
	padding-bottom: 30px;
	justify-content: center;
	align-items: center;
}

.container {
	display: flex;
	z-index: -2;
	flex-wrap: wrap;
	align-items: center;
	font-family: 'Quicksand', sans-serif;
	width: 100%;
	margin: 0;
}

.card_img {
	height: auto;
}

.pagination-container {
	padding-top: 2vh;
	display: flex;
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

.card {
	margin: 5px;
}
</style>