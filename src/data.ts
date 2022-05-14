import { cardInfo } from '@/main'
//public href:string;
//public date:Date;
//public title:string;
//public content:string;
//public area:string; => "Blog" || "Dogfood"
//public flag:string;
//public img:string;

export default class constData{
    public data:Array<cardInfo> = new Array<cardInfo>(
        new cardInfo("/Blog/C Like/1",
            new Date(2021,1,1),
            "C++",
            "Hello World",
            "Blog",
            "C Like",
            "./img/blog/logo.png"
        ),
        new cardInfo("/Blog/C Like/1",
            new Date(2020,1,1),
            "C++",
            "Hello World",
            "Blog",
            "C Like",
            "./img/blog/logo.png"
        ),
        new cardInfo("/Blog/C Like/1",
            new Date(2012,1,1),
            "C++",
            "Hello World",
            "Blog",
            "C Like",
            "./img/blog/logo.png"
        ),
        new cardInfo("/Blog/C Like/1",
            new Date(2032,1,1),
            "C++",
            "Hello World",
            "Blog",
            "C Like",
            "./img/blog/logo.png"
        ),
        new cardInfo("/Blog/C Like/1",
            new Date(2011,1,1),
            "C++",
            "Hello World",
            "Blog",
            "C Like",
            "./img/blog/logo.png"
        ),
        new cardInfo("/Blog/C Like/1",
            new Date(2024,1,1),
            "C++",
            "Hello World",
            "Blog",
            "C Like",
            "./img/blog/logo.png"
        )
    )
}