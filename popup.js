import * as urlsService from "./urls-module/urls-service.js"

let addUrlButton = document.getElementById("addUrlButton");
let urlList = document.getElementById("urlList");
let deleteAllButton = document.getElementById("deleteAllButton");

String.prototype.trunc = String.prototype.trunc ||
    function(n) {
        return (this.length > n) ? this.substr(0, n-1) + '...' : this;
    };

function createListItem(item) {
    let img = document.createElement("img");
    let a = document.createElement("a");
    a.href = item.url;
    a.text = item.title.trunc(30);
    a.target = "_blank";
    img.src = item.fav;
    img.width = 20;
    img.height= 20;

    let finishButton = document.createElement("button");
    finishButton.style.backgroundColor = item.finished ? "blue" : "yellowgreen";
    finishButton.onclick = async function() {
        item.finished = !item.finished;
        await urlsService.updateOne(item);
        finishButton.style.backgroundColor = item.finished ? "blue" : "yellowgreen";
    };

    let li = document.createElement("li");
    urlList.appendChild(li);
    li.appendChild(img);
    li.appendChild(a);
    li.appendChild(finishButton);
}

async function fillList() {
    const urls = await urlsService.getAll();
    urls.forEach(function(url) {
        if (!url.finished) {
            createListItem(url);
        }
    });
}

addUrlButton.onclick = async function(element) {
    try {
        const url = await urlsService.add();
        createListItem(url);
    } catch (message) {
        alert(message)
    }
};

deleteAllButton.onclick = async function(element) {
    await urlsService.deleteAll();
    urlList.innerHTML = '';
};

fillList()
    .then(() => console.log("Initialized successfully"))
    .catch((error) => console.error(error));
