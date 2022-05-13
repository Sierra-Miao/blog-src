import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
//import '@kangc/v-md-editor/lib/theme/style/github.css';

import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

createApp(App).use(router,).use(VMdPreview).mount('#app')

export class cardInfo {
    public href: string;
    public date: Date;
    public title: string;
    public content: string;
    public img: string;
    public flag: string;
    constructor(href: string, date: Date, title: string, content: string, flag: string, img = "./assets/logo.png") {
        this.content = content;
        this.date = date;
        this.href = href;
        this.title = title;
        this.img = img;
        this.flag = flag;
    }
    valueOf() {
        return this.date;
    }
}