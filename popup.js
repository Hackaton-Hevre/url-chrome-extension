import { getAll, add, deleteAll, updateOne } from "./urls-module/urls-service.js"

let addUrlButton = document.getElementById("addUrlButton");
let urlList = document.getElementById("urlList");
let deleteAllButton = document.getElementById("deleteAllButton");

function createListItem(item) {
    let img = document.createElement("img");
    let a = document.createElement("a");
    a.href = item.url;
    a.text = item.title;
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
    urlList.appendChild(li);
    li.appendChild(img);
    li.appendChild(a);
    li.appendChild(finishButton);
}

getAll(function (urls) {
    urls.forEach(function(url) {
        if (!url.finished) {
            createListItem(url);
        }
    });
});

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


