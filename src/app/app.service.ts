import {Url} from './model/url.model';
import {ExtensionApiError, UrlExistsError} from './model/url.errors';

export class AppService {
  constructor() {
  }

  async getAll(): Promise<Url[]> {
    // uncomment this to simulate a long loading and see how the ui reacts
    // await new Promise( resolve => setTimeout(resolve, 1000));
    const result = await chrome.storage.sync.get('urls');
    if (result.urls === undefined) {
      return [];
    }
    return result.urls;
  }

  async add(): Promise<Url> {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const tab = tabs[0];
    if (tab === undefined) {
      throw new ExtensionApiError('Error with the url please try again later');
    }
    const result = await chrome.storage.sync.get('urls');
    let urls = result.urls;
    if (urls === undefined) {
      urls = [];
    }
    const urlObj = new Url(tab.url, tab.title, tab.favIconUrl, false);
    const existing = urls.find(item => {
      return item.url === urlObj.url && !item.finished;
    });
    if (existing) {
      throw new UrlExistsError('Url already exists');
    }

    urls.push(urlObj);
    await chrome.storage.sync.set({urls});
    return urlObj;
  }

  async deleteAll() {
    await chrome.storage.sync.remove(['urls']);
  }

  async updateOne(urlObj): Promise<Url[]> {
    const result = await chrome.storage.sync.get('urls');
    let urls = result.urls;
    urls = urls.filter(item => {
      return item.url !== urlObj.url;
    });
    // urls.push(urlObj);
    await chrome.storage.sync.set({urls});
    return urls;
  }

  async openUrl(urlObj) {
    await chrome.tabs.create({url: urlObj.url});
  }
}
