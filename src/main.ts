import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

export class cardInfo {
    public href: string;
    public date: Date;
    public title: string;
    public content: string;
    public area:string;
    public flag: string;
    public img: string;
    
    constructor(href: string, date: Date, title: string, content: string, area: string, flag: string, img = "./img/default.png") {
        this.content = content;
        this.date = date;
        this.href = href;
        this.title = title;
        this.img = img;
        this.flag = flag;
        this.area = area;
    }
    valueOf(): number {
        if(this.flag === "世界第一的童话" || this.flag === "快雪时晴"){
            return -this.date.valueOf()
        }
        else{
            return this.date.valueOf();
        }
    }
}