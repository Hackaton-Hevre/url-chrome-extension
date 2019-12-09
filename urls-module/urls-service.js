const getAll = function(callback) {
    chrome.storage.sync.get("urls", function (result) {
        if (result.urls === undefined) {
            return;
        }
        callback(result.urls);
    });
};

const add = function(success, failure) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const tab = tabs[0];
        if (tab === undefined) {
            failure("Error with the url please try again later");
            return;
        }
        chrome.storage.sync.get("urls", function(result) {
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
                failure("Url already exists");
                return;
            }

            urls.push(urlObj);
            chrome.storage.sync.set({urls: urls}, function() {
                success(urlObj);
            });
        });
    });
};

const deleteAll = function(callback) {
    chrome.storage.sync.remove(["urls"],function() {
        callback();
    });
};

const updateOne = function(urlObj, callback) {
    chrome.storage.sync.get("urls", function(result) {
        let urls = result.urls;
        urls = urls.filter(function(item) {
            return item.url !== urlObj.url;
        });
        urls.push(urlObj);
        chrome.storage.sync.set({urls: urls}, function() {
            callback();
        });
    });
};

export {
    getAll,
    add,
    deleteAll,
    updateOne,
}
