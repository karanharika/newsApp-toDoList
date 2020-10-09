// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tab1',
//   templateUrl: 'tab1.page.html',
//   styleUrls: ['tab1.page.scss']
// })
// export class Tab1Page {

//   constructor() {}

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';

const URL = "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=4a0bb4f717d44542a83c4cf54dd5384f";

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page  {
  private selectedItem: any;
  _http:HttpClient;
  
  public articles: Array<{author: string; content: string; description:string; publishedAt: string; source:object; title:string; url:string; urlToImage:string }> = [];
  public imageLink: string;

  constructor(private storage: Storage) { 

    let req = new Request(URL);
    fetch(req)
    .then(response => response.json())
    .then(json => {
      // this.atricles = json.articles
      for (let i = 0; i < json.articles.length; i++) {
        let tempObj = {author: json.articles[i].author, 
                       content: json.articles[i].content,
                      description: json.articles[i].description,
                      publishedAt: json.articles[i].publishedAt,
                      source: json.articles[i].source,
                      title: json.articles[i].title,
                      url: json.articles[i].url,
                      urlToImage: json.articles[i].urlToImage}
        this.articles.push(tempObj);
        this.storage.remove(String(i));
    this.storage.set(String(i), json.articles[i]);
      }
      console.log(this.articles);
    }); 

  }
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.remove("data");
    this.storage.set("data", this.articles);
    
  }
}
