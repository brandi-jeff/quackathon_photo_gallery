input__form.addEventListener("submit", (e) => {
    e.preventDefault();
    storeData();
});

function storeData() {
    const searchTerm = user__input.value.toLowerCase();
    makeCard(searchTerm);
    input__form.reset();
}

function makeCard(searchTerm) {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "cardDiv");
    // cardDiv.setAttribute("id", "fullCard");
    art__here.appendChild(cardDiv); 
    
    // const card = document.createElement("div");
    // card.setAttribute("class", "card");
    // cardDiv.appendChild(card);

    displayImgs(searchTerm);
}

function displayImgs(searchTerm) {
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&limit=15&fields=id,title,image_id`;
    fetch(url)
      .then((response) => response.json())
      .then((images) => {
        const results = images.data;
        results.map((result) => {
          const jpg__url = `https://www.artic.edu/iiif/2/${result.image_id}/full/843,/0/default.jpg`;
  
          // create a new card div for each image
          const cardDiv = createCardDiv();
          art__here.appendChild(cardDiv);
  
          // add the image element to the card div
          const img = createImg(jpg__url, result.title);
          cardDiv.appendChild(img);
  
          // add the button elements to the card div
          const btnDiv = createBtnDiv();
          cardDiv.appendChild(btnDiv);
          
        });
      });
  }
  
  function createCardDiv() {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "cardDiv");
    return cardDiv;
  }
  
  function createImg(jpg__url, title) {
    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", jpg__url);
    img.setAttribute("alt", title);
    img.style.width = "15rem";
    img.style.height = "15rem";
    return img;
  }
  
  function createBtnDiv() {
    const btnDiv = document.createElement("div");
    btnDiv.setAttribute("id", "card-btns");
    const saveBtn = document.createElement("button");
    saveBtn.setAttribute("type", "button");
    saveBtn.setAttribute("class", "btn");
    saveBtn.setAttribute("class", "btn-primary");
    btnDiv.appendChild(saveBtn);
    saveBtn.textContent = "Save";
    return btnDiv;
  }
  