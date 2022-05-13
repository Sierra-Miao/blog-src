<template>
	<div>
		<div class="mdui-toolbar background-pink mdui-appbar-fixed mdui-shadow-0" style="z-index:100;">
			<router-link to="" class="mdui-btn mdui-btn-icon">
				<i mdui-drawer="{target: '#main-drawer'}" class="mdui-icon material-icons">menu</i>
			</router-link>
			<span class="mdui-typo-title">{{ title }}</span>
			<div class="mdui-toolbar-spacer" style="z-index:1;"></div>
			<router-link to="" class="mdui-textfield-icon mdui-btn mdui-btn-icon">
				<i class="mdui-icon material-icons">search</i>
			</router-link>
		</div>
		<div class="mdui-drawer background-pink" style="margin-top: -8px;" id="main-drawer">
			<div class="mdui-list" mdui-collapse="{accordion: true}" style="margin-bottom: 76px;">
				<div class="mdui-collapse-item">
					<div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
						<div class="mdui-list-item-content">Blog</div>
						<i class="mdui-collapse-item-arrow mdui-icon mdui-ripple material-icons">keyboard_arrow_down</i>
					</div>
					<div class="mdui-collapse-item-body mdui-list">
						<router-link to="/" class="mdui-list-item mdui-ripple">All</router-link>
						<router-link to="/C Like" class="mdui-list-item mdui-ripple">C Like</router-link>
						<router-link to="/前端" class="mdui-list-item mdui-ripple">前端</router-link>
						<router-link to="/后端" class="mdui-list-item mdui-ripple">后端</router-link>
					</div>
				</div>
				<div class="mdui-collapse-item">
					<div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
						<div class="mdui-list-item-content">狗粮篇</div>
						<i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
					</div>
					<div class="mdui-collapse-item-body mdui-list">
						<router-link to="" class="mdui-list-item mdui-ripple">小日常</router-link>
						<router-link to="" class="mdui-list-item mdui-ripple">奇奇怪怪的图</router-link>
						<router-link to="" class="mdui-list-item mdui-ripple">番外篇</router-link>
						<router-link to="" class="mdui-list-item mdui-ripple">滑滑乱翻书</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
	<router-view/>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class toolBar extends Vue {
	public title = "";
	async created(): Promise<void> {
		await this.$router.isReady();
		this.title = typeof this.$route.params.flag === "string" ? this.$route.params.flag :  "Blog";
		this.$watch(
			() => this.$route,
			() => {
				this.title = typeof this.$route.params.flag === "string" ? this.$route.params.flag :  "Blog";
			}
		)
	}
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
.background-pink {
  background-color: #e493d0;
  background-image: 
    radial-gradient(farthest-side, rgba(235, 105, 78, 1), rgba(235, 105, 78, 0)),
    radial-gradient(farthest-side, rgba(243, 11, 164, 1), rgba(243, 11, 164, 0)),
    radial-gradient(farthest-side, rgba(254, 234, 131, 1), rgba(254, 234, 131, 0)),
    radial-gradient(farthest-side, rgba(170, 142, 245, 1), rgba(170, 142, 245, 0)),
    radial-gradient(farthest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0));
  background-size: 
    130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
  background-position:
    -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
  animation: 7s movement linear infinite;
  color: white;
  font-family: 'Quicksand', sans-serif;
}
@keyframes movement {
    0%, 100% {
      background-size: 
        130vmax 130vmax,
        80vmax 80vmax,
        90vmax 90vmax,
        110vmax 110vmax,
        90vmax 90vmax;
      background-position:
        -80vmax -80vmax,
        60vmax -30vmax,
        10vmax 10vmax,
        -30vmax -10vmax,
        50vmax 50vmax;
    }
    25% {
      background-size: 
        100vmax 100vmax,
        90vmax 90vmax,
        100vmax 100vmax,
        90vmax 90vmax,
        60vmax 60vmax;
      background-position:
        -60vmax -90vmax,
        50vmax -40vmax,
        0vmax -20vmax,
        -40vmax -20vmax,
        40vmax 60vmax;
    }
    50% {
      background-size: 
        80vmax 80vmax,
        110vmax 110vmax,
        80vmax 80vmax,
        60vmax 60vmax,
        80vmax 80vmax;
      background-position:
        -50vmax -70vmax,
        40vmax -30vmax,
        10vmax 0vmax,
        20vmax 10vmax,
        30vmax 70vmax;
    }
    75% {
      background-size: 
        90vmax 90vmax,
        90vmax 90vmax,
        100vmax 100vmax,
        90vmax 90vmax,
        70vmax 70vmax;
      background-position:
        -50vmax -40vmax,
        50vmax -30vmax,
        20vmax 0vmax,
        -10vmax 10vmax,
        40vmax 60vmax;
    }
}
</style>