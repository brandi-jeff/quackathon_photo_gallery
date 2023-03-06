let retrievedPaintings = window.localStorage; //retrieve the object4
let myGallery = document.getElementById("myGallery");
let parsedStorage = [];
let keys = Object.keys(retrievedPaintings)

console.log(retrievedPaintings)
console.log("keys", keys)

keys.forEach(key => {
    // debugger
    let item = localStorage.getItem(key)
    parsedStorage.push(JSON.parse(item))
})

console.log("parsedStorage", parsedStorage)

parsedStorage.forEach(painting => {
    debugger
    let artUrl = painting.paintingUrl;
    let artImg = document.createElement("img")
    artImg.setAttribute("src", artUrl);
    artImg.style.width = "15rem";
    artImg.style.height = "15rem";
    myGallery.appendChild(artImg);
})