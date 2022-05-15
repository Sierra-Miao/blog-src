<template>
    <!-- <v-md-preview :text="content"></v-md-preview> -->
    <div>
        <md-editor style="padding:0 1.5rem;" v-model="content" :highlight="hljs" theme="light" preview-theme="vuepress" previewOnly />
        <div style="margin: 1.5em auto; display: flex; justify-content: center;">
            <a @click="prev" style="margin:0.5rem" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink-accent">上一章</a>
            <a @click="next" style="margin:0.5rem" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink-accent">下一章</a>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Vue, Options } from 'vue-class-component';
import hljs from 'highlight.js';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
@Options({
  components: {
    MdEditor,
  },
})
export default class pageView extends Vue {
    public content = "";
    public hljs = hljs;

    async created(): Promise<void> {
        await this.$router.isReady();
        this.fetchContent();
        this.$watch(
            () => this.$route,
            () => {
                if (this.$route.params.id === undefined)
                    return;
                else {
                    this.fetchContent();
                }
            }
        )
    }

    fetchContent(): void {
        axios.get(`./docs/${this.$route.params.area}/${this.$route.params.flag}/${this.$route.params.id}.md`)
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

    prev(): void{
        this.$router.push(`/${this.$route.params.area}/${this.$route.params.flag}/${Number(this.$route.params.id) - 1}`)
    }

    next(): void{
        this.$router.push(`/${this.$route.params.area}/${this.$route.params.flag}/${Number(this.$route.params.id) + 1}`)
    }
}
</script>

<style>
</style>