import {Component, OnInit} from '@angular/core';
import { Url } from './model/url.model';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  urls: Url[] = [];
  dataReady = false;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getAll()
      .then(urls => {
        this.urls = urls;
        this.dataReady = true;
      });
  }

  async addUrlButtonPressed() {
    const url: Url = await this.appService.add();
    if (url) {
      this.urls.push(url);
    }
  }

  async deleteAllButtonPressed() {
    await this.appService.deleteAll();
    this.urls = [];
  }

  async urlActionButtonPressed(i: number) {
    const url: Url = this.urls[i];
    url.finished = true;
    await this.appService.updateOne(url);
  }
}
