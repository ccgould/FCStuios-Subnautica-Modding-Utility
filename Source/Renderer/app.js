const { shell, dialog, ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
const modItems = require("./Handlers/ModItems")
const modJsons = [];
window.$ = window.jQuery = require('jquery');
const directoryPath = "C:\\Games\\SteamLibrary\\steamapps\\common\\Subnautica\\QMods"//path.join(__dirname, "Documents");

OnHomeClick();

// w3IncludeHTML()

document.getElementById("facebookBTN").addEventListener("click", (e) => {
  shell.openExternal("https://www.facebook.com/gaming/FCSTools"); 
});

document.getElementById("homeBTN").addEventListener("click", (e) => {
  OnHomeClick();
});

document.getElementById("notificationBTN").addEventListener("click", (e) => {
OnNotificationClick();
});

document.getElementById("subnauticaBTN").addEventListener("click", (e) => {
  OnSubnauticaClick();
});

document.getElementById("youtubeBTN").addEventListener("click", (e) => {
  shell.openExternal("https://www.youtube.com/channel/UC_5YTyCTAFyNut_QR0YZqsg");
});

document.getElementById("githubBTN").addEventListener("click", (e) => {
  shell.openExternal("https://github.com/ccgould");
});

document.getElementById("patreonBTN").addEventListener("click", (e) => {
  shell.openExternal("https://www.patreon.com/fieldcreatorsstudios");
});

function OnSubnauticaClick() {
  $("#mod-page-items-area").replaceWith("");
  $("#container").load("./Pages/modPage.html", function(){
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      //listing all files using forEach
      files.forEach(function (file) {
        // Do whatever you want to do with the file
        var filePath = path.join(directoryPath, file);
        var stats = fs.statSync(filePath);
        if (stats.isDirectory() && file.startsWith("FCS_")) {
          console.log(file);
          var result = loadJsonFile(filePath);
          modItems.AddMod(result, filePath);
        }
      });
    });
  });
}

function loadJsonFile(filePath) {
  let rawdata = fs.readFileSync(path.join(filePath, "mod.json"));
  let modConfig = JSON.parse(rawdata);
  console.log(modConfig);
  return modConfig;
}

function OnNotificationClick() {
  // let notification = new Notification("Electron App", {
  //   body: "Some Notification Info",
  // });

  // notification.onclick = (e) => {
  //   console.log(e);
  //   ipcRenderer.invoke("get-Window");
  // };

    document.getElementById("container").innerHTML = "<p>Notifications</p>";
}

function OnHomeClick() {
    $("#container").load("./Pages/home.html");
}

ipcRenderer.on("sendWindow", (e, args) => {
  console.log(args);
});


// setTimeout(() =>{
//  SendNotification();
// },2000)