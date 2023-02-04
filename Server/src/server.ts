import express=require('express')
import  { Request, Response } from "express";
let cors = require('cors');
const app = express();
app.use(cors());
interface ApiData {
  imageUrl: string;
  title: string;
  teaser: string;
  author: string;
  type: string;
  metaDescription: string;
}
class Model {
  imageUrl!: string;
  title!: string;
  teaser!: string;
  author!: string;
  type!: string;
  metaDescription!: string;
  constructor(data: ApiData) {
    this.imageUrl = data.imageUrl;
    this.title = data.title;
    this.teaser = data.teaser;
    this.author = data.author;
    this.type = data.type;
    this.metaDescription = data.metaDescription;
  }
}
app.get("/", async (req: Request, res: Response) => {

    let middleWareResponse: Model[] = [];
    let url=`https://stage-api.homluv.com/api/nlc/${req.query.type}?pagesize=${req.query.pagesize}&page=${req.query.page}&category=${req.query.category}`;
    if(req.query.search)
    {
        url=`https://stage-api.homluv.com/api/nlc/articles?pagesize=10&page=${req.query.page}&search=${req.query.search}`;
    }else if(req.query.title)
    {
        url=`https://stage-api.homluv.com/api/nlc/detail?title=${req.query.title}`;
    }
    console.log(url);
    try {
        const value = await fetch(url);
        if(value.status==404){
          res.send({});
       }
       else
       {
          const data: ApiData[] = await value.json();
          data.map((item: ApiData) => {
            let mappedData = new Model(item);
            middleWareResponse.push(mappedData);
          });
          res.send(middleWareResponse);
       }
       
      } catch {
        console.log("There is some error fetching data.");
      }
});
app.listen(8080,async()=>{
    console.log("server is running");
});