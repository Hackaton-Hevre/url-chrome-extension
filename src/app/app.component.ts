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
  constructor(private appService: AppService) { }

  async ngOnInit() {
    this.urls = await this.appService.getAll();
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
}
