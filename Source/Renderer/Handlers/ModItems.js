//DOM nodes
let items = document.getElementById("mod-page-items-area");
const path = require("path");
const { ipcRenderer } = require("electron");
//storage
exports.storage = []

exports.select = e =>{

 //Remove currently selected item class
 
}

exports.open = (event) => {
  var clickedElement = event.target;
  // Do important stuff with clickedElement.
  var content = clickedElement.parentElement.parentElement.dataset.path
  console.log("got it: " +  content);
  //ipcRenderer.invoke('open-config',content);
};;

//Add new item
exports.AddMod = (item,filePath) => {

  if(item.IconName)
  {
   var icon = path.join(filePath,"Assets",item.IconName)
  }

  console.log(typeof item.IconName);
  console.log(typeof item.Description);
  console.log(typeof item.QModSAM);

  //Create new html item
  let itemNode = document.createElement("div");
  
  //Assign mod-item
  itemNode.setAttribute("class", "mod-item");

  //Add Inner HTML
  itemNode.innerHTML = `<p class="mod-item-text">${item.Description}</p>
 <div class="mod-item-title-bar">
  <h3 id="mod-item-title">${item.DisplayName}</h3>
  <img id="mod-item-icon" src="${icon}" alt="Mod Image">
  <button id="mod-item-configure-button" type="button">CONFIGURE</button>
  <label class="toggle-button">
   <input type="checkbox">
    <span class="slider"></span></label>
 </div>`;

  itemNode.setAttribute("data-path", filePath);

  itemNode.getElementsByTagName("BUTTON")[0].addEventListener("click", this.open);
 // Set mod json path as data atrribute

  //Append new node to "#mod-item-title"
  $("#mod-page-items-area").append(itemNode);
  //items.appendChild(itemNode);

  item;
};


{/* <div class="mod-item">
 <p class="mod-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue massa et odio rutrum, nec.</p>
 <div class="mod-item-title-bar">
  <p id="mod-item-title">{TITLE}</p>
  <img id="mod-item-icon" src="https://via.placeholder.com/50x50.png" alt="Mod Image">
  <button id="mod-item-configure-button" type="button">CONFIGURE</button>
  <label class="toggle-button">
   <input type="checkbox">
    <span class="slider"></span></label>
 </div>
</div> */}