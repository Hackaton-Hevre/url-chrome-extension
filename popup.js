import { getAll, add, deleteAll, updateOne } from "./urls-module/urls-service.js"

let addUrlButton = document.getElementById("addUrlButton");
let urlList = document.getElementById("urlList");
let deleteAllButton = document.getElementById("deleteAllButton");

String.prototype.trunc = String.prototype.trunc ||
    function(n){
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
    finishButton.onclick = function() {
        item.finished = true;
        updateOne(item, function() {
            finishButton.style.backgroundColor = "blue"
        });
    };

    let li = document.createElement("li");
    li.width = urlList.width;
    urlList.appendChild(li);
    li.appendChild(img);
    li.appendChild(a);
    li.appendChild(finishButton);
}

function fillList() {
    getAll(function (urls) {
        urls.forEach(function(url) {
            if (!url.finished) {
                createListItem(url);
            }
        });
    });
}

addUrlButton.onclick = function(element) {
    add(
        function(url) {
            createListItem(url);
        },
        function(message) {
            alert(message);
        });
};

deleteAllButton.onclick = function(element) {
    deleteAll(function() {
        urlList.innerHTML ='';
    });
};

fillList();
