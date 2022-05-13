import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
//import '../node_modules/@kangc/v-md-editor/lib/theme/vuepress.css';

// Prism
import Prism from 'prismjs'
// 代码高亮
import 'prismjs/components/prism-json'

VMdPreview.use(vuepressTheme, {
    Prism
})

createApp(App).use(router).use(VMdPreview).mount('#app')

export class cardInfo{
    public href:string;
    public date:Date;
    public title:string;
    public content:string;
    public img:string;
    public flag:string;
    constructor(href:string, date:Date, title:string, content:string, flag:string, img = "./assets/logo.png"){
        this.content = content;
        this.date = date;
        this.href = href;
        this.title = title;
        this.img = img;
        this.flag = flag;
    }
    valueOf(){
        return this.date;
    }
}