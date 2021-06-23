// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { shell } = require("electron");

var handler = document.querySelector(".handler");
var wrapper = handler.closest(".wrapper");
var boxA = wrapper.querySelector(".box");
var isHandlerDragging = false;

document.addEventListener("mousedown", function (e) {
  // If mousedown event is fired from .handler, toggle flag to true
  if (e.target === handler) {
    isHandlerDragging = true;
  }
});

document.addEventListener("mousemove", function (e) {
  // Don't do anything if dragging flag is false
  if (!isHandlerDragging) {
    return false;
  }

  // Get offset
  var containerOffsetLeft = wrapper.offsetLeft;

  // Get x-coordinate of pointer relative to container
  var pointerRelativeXpos = e.clientX - containerOffsetLeft;

  // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
  var boxAminWidth = 60;

  // Resize box A
  // * 8px is the left/right spacing between .handler and its inner pseudo-element
  // * Set flex-grow to 0 to prevent it from growing
  boxA.style.width = Math.max(boxAminWidth, pointerRelativeXpos - 8) + "px";
  boxA.style.flexGrow = 0;
});

document.addEventListener("mouseup", function (e) {
  // Turn off dragging flag when user mouse is up
  isHandlerDragging = false;
});

// const el = document.querySelector(".item");

// el.addEventListener("mousedown", mousedown);

// function mousedown(e) {
//   window.addEventListener("mousemove", mousemove);
//   window.addEventListener("mouseup", mouseup);

//   let prevX = e.clientX;
//   let prevY = e.clientY;

//   function mousemove() {
//     let newX = prevX - e.clientX;
//     let newY = prevY - e.clientY;

//     const rect = el.getBoundingClientRect();

//     el.style.left = rect.left - newX + "px";
//     el.style.top = rect.top - newY + "px";

//     prevX = e.clientX;
//     prevY = e.clientY;
//   }

//   function mouseup() {
//     window.removeEventListener("mousemove", mousemove);
//     window.removeEventListener("mouseup", mouseup);
//   }
// }

let win;

document.getElementById("new-window").addEventListener("click", newWin);
document.getElementById("close-window").addEventListener("click", closeWin);
document.getElementById("select-file").addEventListener("click", SelectFile);

function SelectFile() {
  shell.showItemInFolder(
    "C:\\Games\\SteamLibrary\\steamapps\\common\\Subnautica\\QMods\\FCS_VehicleOxygenUpgrade\\mod.json"
  );
}

function newWin() {
  win = window.open(
    "https://google.com",
    "_blank",
    "width=500,height=450,alwaysOnTop=1"
  );
}
function closeWin() {
  win.close();
}
