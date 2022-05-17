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
		<div :style="gridResponsiveLayout" class="container">
			<div class="mdui-card card" v-for="item in searchResult" :key="item.href">
				<div class="mdui-card-media">
					<img :src="item.img">
				</div>
				<div @click="navagate(item.href)" class="mdui-card-primary mdui-ripple card_title"
					style="background-color: rgba(253, 188, 199,0.5);">
					<div class="mdui-card-primary-title">{{ item.title }}</div>
					<div class="mdui-card-primary-subtitle">{{
							`${item.date.getFullYear()}.${item.date.getMonth() + 1}.${item.date.getDate()}`
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
	private Data = new constData().data.filter((elem) => elem.area === "Blog").sort((a,b) => b.valueOf() - a.valueOf());
	public searchResult: Array<cardInfo> = new Array<cardInfo>();
	public searchWords = "";
	public gridResponsiveLayout = "grid-template-columns: repeat(3, 33.3%);";
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
		this.ResponsiveLayout()
		window.onresize = () => this.ResponsiveLayout();
	}

	isNullOrEmpty(str: string): boolean {
		return (!str || /^\s*$/.test(str));
	}

	cardDataSearch(elem: cardInfo, toSearch: string): boolean {
		return (elem.title.indexOf(toSearch) !== -1 || elem.content.indexOf(toSearch) !== -1 || `${elem.date.getFullYear()}.${elem.date.getMonth() + 1}.${elem.date.getDate()}`.indexOf(toSearch) !== -1)
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

</style>