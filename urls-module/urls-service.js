import { Url } from "./model/url.js"

export async function getAll() {
    const result = await chrome.storage.sync.get("urls");
    if (result.urls === undefined) {
        return;
    }
    return result.urls;
}

export async function add() {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const tab = tabs[0];
    if (tab === undefined) {
        throw "Error with the url please try again later";
    }
    const result = await chrome.storage.sync.get("urls");
    let urls = result.urls;
    if (urls === undefined) {
        urls = [];
    }
    const urlObj = new Url(tab.url, tab.title, tab.favIconUrl, false);
    const existing = urls.find(function(item) {
        return item.url === urlObj.url && !item.finished;
    });
    if (existing) {
        throw "Url already exists";
    }

    urls.push(urlObj);
    await chrome.storage.sync.set({urls: urls});
    return urlObj;
}

export async function deleteAll() {
    await chrome.storage.sync.remove(["urls"]);
}

export async function updateOne(urlObj) {
    const result = await chrome.storage.sync.get("urls");
    let urls = result.urls;
    urls = urls.filter(function(item) {
        return item.url !== urlObj.url;
    });
    urls.push(urlObj);
    await chrome.storage.sync.set({urls: urls});
}
