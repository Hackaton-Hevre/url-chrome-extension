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
    try {
      const url: Url = await this.appService.add();
      this.urls.push(url);
    } catch (e) {
      alert(e.message);
    }
  }

  async deleteAllButtonPressed() {
    await this.appService.deleteAll();
    this.urls = [];
  }

  async urlActionButtonPressed(i: number, event?: Event) {
    // this stops the click from going up the stack and preform the click function on the mat-list-item
    if (event) {
      console.log(event);
      event.stopPropagation();
    }
    const url: Url = this.activeUrls()[i];
    url.finished = true;
    await this.appService.updateOne(url);
  }

  async listItemPressed(index: number) {
    console.log(index);
    await this.appService.openUrl(this.urls[index]);
  }

  activeUrls() {
    return this.urls.filter(url => !url.finished);
  }
}
