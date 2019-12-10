const getAll = async function(callback) {
    const result = await chrome.storage.sync.get("urls");
    if (result.urls === undefined) {
        return;
    }
    return result.urls;
};

const add = async function() {
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
    const urlObj = {
        title: tab.title,
        fav: tab.favIconUrl,
        url: tab.url,
        finished:false
    };
    const existing = urls.find(function(item) {
        return item.url === urlObj.url && !item.finished;
    });
    if (existing) {
        throw "Url already exists";
    }

    urls.push(urlObj);
    await chrome.storage.sync.set({urls: urls});
    return urlObj;
};

const deleteAll = async function() {
    await chrome.storage.sync.remove(["urls"]);
};

const updateOne = async function(urlObj) {
    const result = await chrome.storage.sync.get("urls");
    let urls = result.urls;
    urls = urls.filter(function(item) {
        return item.url !== urlObj.url;
    });
    urls.push(urlObj);
    await chrome.storage.sync.set({urls: urls});
};

export {
    getAll,
    add,
    deleteAll,
    updateOne,
}
