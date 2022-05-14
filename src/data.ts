import { cardInfo } from '@/main'
//public href:string;
//public date:Date;
//public title:string;
//public content:string;
//public flag:string;
//public img:string;

export default class constData{
    public data:Array<cardInfo> = new Array<cardInfo>(
        new cardInfo("/Blog/C Like/1",
            new Date(2022,1,1),
            "C++",
            "Hello World",
            "C Like",
            "./img/blog/logo.png"
        ),
        new cardInfo("/Blog/C Like/1",
            new Date(2022,1,1),
            "C++",
            "Hello World",
            "C Like",
            "./img/blog/logo.png"
        ),
        new cardInfo("/Blog/C Like/1",
            new Date(2022,1,1),
            "C++",
            "Hello World",
            "C Like",
            "./img/blog/logo.png"
        ),
    )
}