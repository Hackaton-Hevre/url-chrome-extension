let addUrl = document.getElementById("addUrl");
let urlList = document.getElementById("urlList");
let deleteAll = document.getElementById("deleteAll");

function createListItem(item) {
    let img = document.createElement("img");
    let a = document.createElement("a");
    a.href = item.url;
    a.text = item.title;
    a.target = "_blank";
    img.src = item.fav;
    img.width = 20;
    img.height= 20;

    let li = document.createElement("li");
    urlList.appendChild(li);
    li.appendChild(img);
    li.appendChild(a);
}

chrome.storage.sync.get("urls", function(result) {
    if (result.urls === undefined) {
        return;
    }

    result.urls.forEach(function (item) {
        if (!item.finished) {
            createListItem(item);
        }
    });
});

addUrl.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const tab = tabs[0];
        if (tab === undefined) {
            alert("Error with the url please try again later");
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
            urls.push(urlObj);
            chrome.storage.sync.set({urls: urls}, function() {
                createListItem(urlObj)
            });
        });
    });
};


deleteAll.onclick = function(element) {
    chrome.storage.sync.remove(["urls"],function() {
        urlList.innerHTML ='';
    });
};


