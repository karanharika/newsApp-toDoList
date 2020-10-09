import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  author:string;
  content:string;
  description:string;
  publishedAt:string;
  title:string;
  index:string;
  imageURL:string;
  newsURL:string
  data:object;
  date:string;
  time:string;

  constructor(private route: ActivatedRoute, private storage: Storage){
  }

  ionViewWillEnter(){
 
    this.author = this.route.snapshot.paramMap.get('author');   

    this.content = this.route.snapshot.paramMap.get('content');   

    this.description = this.route.snapshot.paramMap.get('description');   

    this.publishedAt = this.route.snapshot.paramMap.get('publishedAt');   

    this.title = this.route.snapshot.paramMap.get('title');   

    this.index = this.route.snapshot.paramMap.get('index');

    this.storage.get(this.index).then((val) => {
      this.data = val;
      this.imageURL = this.data["urlToImage"];
      this.newsURL = this.data["url"];
    });

    this.date = this.publishedAt.substring(0,10);
    this.time = this.publishedAt.substring(11,19);

  }
}
