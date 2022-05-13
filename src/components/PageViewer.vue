<template>
    <v-md-preview :text="content"></v-md-preview>
</template>

<script lang="ts">
import axios from 'axios'
import { Vue } from 'vue-class-component';
export default class pageView extends Vue {
    public content = "";
    async created(): Promise<void> {
        await this.$router.isReady();
        await axios.get(`./docs/${this.$route.params.flag}/${this.$route.params.id}.md`)
            .then((res) => {
                this.content = res.data;
            })
            .catch((error) => {
                if (error.status !== 200) {
                    alert("找不到页面!");
                    this.$router.go(-1);
                }
            })
        this.$watch(
            () => this.$route,
            () => {
                if(this.$route.params.id === undefined)
                    return;
                axios.get(`./docs/${this.$route.params.flag}/${this.$route.params.id}.md`)
                    .then((res) => {
                        this.content = res.data;
                    })
                    .catch((error) => {
                        if (error.status !== 200) {
                            alert("找不到页面!");
                            this.$router.go(-1);
                        }
                    })
            }
        )
    }
}
</script>

<style>
</style>