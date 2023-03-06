let gallery = [];

// search submit event
input__form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("e", e)
    retrieveArt();
});

function retrieveArt() {
    const searchTerm = user__input.value.toLowerCase();
    makeCard(searchTerm);
    input__form.reset();
}

function makeCard(searchTerm) {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "cardDiv");
    art__here.appendChild(cardDiv); 
    displayImgs(searchTerm);
}

function displayImgs(searchTerm) {
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&limit=15&fields=id,title,image_id`;
    fetch(url)
      .then((response) => response.json())
      .then((images) => {
        const results = images.data;
        console.log("RESULTS", results)
        results.map((result) => {
          const jpg__url = `https://www.artic.edu/iiif/2/${result.image_id}/full/843,/0/default.jpg`;
          let paintingLink = 'paintingUrl';
          result[paintingLink] = jpg__url;
        //   console.log("result", result)
          // create a new card div for each image
          const cardDiv = createCardDiv(result);
          art__here.appendChild(cardDiv);
  
          // add the image element to the card div
          const img = createImg(jpg__url, result.title);
          cardDiv.appendChild(img);
  
          // add the button elements to the card div
          const btnDiv = createBtnDiv(result);
          cardDiv.appendChild(btnDiv);
        });
    });
}
  
function createCardDiv(painting) {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "cardDiv");
    cardDiv.setAttribute("id", painting.id)
    return cardDiv;
}
  
function createImg(jpg__url, title) {
    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", jpg__url);
    img.setAttribute("alt", title);
    img.style.width = "15rem";
    img.style.height = "15rem";
    // console.log("IMG", img) 
    // <img class="card-img-top" src="https://www.artic.edu/iiif/2/872371ff-d773-f209-8062-7f88c95f2691/full/843,/0/default.jpg" alt="Portrait of Sylvette David" style="width: 15rem; height: 15rem;">
    return img;
}
  
function createBtnDiv(result) {
    // console.log("result", result)
    const btnDiv = document.createElement("div");
    btnDiv.setAttribute("class", "saveButton");
    const saveBtn = document.createElement("button");
    saveBtn.setAttribute("type", "button");
    saveBtn.setAttribute("class", "btn");
    saveBtn.setAttribute("class", "btn-primary");
    btnDiv.appendChild(saveBtn);
    saveBtn.textContent = "Save";
    saveBtn.setAttribute("id", result.id)
    saveBtn.addEventListener('click', (e) => savePainting(e, result));
    return btnDiv;
}


function savePainting(e, result) {
    console.log("ID",e, result)
    // var paintingId = document.getElementById(result.id)
    localStorage.setItem(result.id, JSON.stringify(result))
    gallery.push(result)
    console.log("gallery", gallery)
}

  
// localStorage.setItem('painting', JSON.stringify(painting)); //stringify object and store
// var retrievedPainting = JSON.parse(localStorage.getItem('painting')); //retrieve the object
// gallery.push(painting2)
// localStorage.setItem('gallery', JSON.stringify(gallery)); //stringify object and store
