export class Url {
  public url: string;
  public title: string;
  public fav: string;
  public finished: boolean;
  constructor(url: string, title: string, fav: string, finished: boolean) {
    this.url = url;
    this.title = title;
    this.fav = fav;
    this.finished = finished;
  }
}
