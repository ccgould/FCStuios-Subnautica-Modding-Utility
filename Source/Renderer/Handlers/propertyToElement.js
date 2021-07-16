var jsonObj = {
  myObject: [
    {
      title: "JAVA",
      isEnabled: false,
      path: "json/data.json",
    },
    {
      title: "C#",
      isEnabled: true,
      path: "json/data1.json",
    },
    {
      title: "C++",
      isEnabled: true,
      path: "json/data2.json",
    },
  ],
};
var count = Object.keys(jsonObj.myObject).length;
//alert(count);
var btnContainer = document.getElementById("buttons");
var chkContainer = document.getElementById("checkboxes");
for (var i = 0; i < count; i++) {
  for (var propertyName in jsonObj.myObject[i]) {
    //console.log(propertyName);
    //console.log(typeof jsonObj.myObject[i][propertyName])

    var obj = jsonObj.myObject[i];
    if (typeof obj[propertyName] === "boolean") {
      let chk = "";
      if (obj.isEnabled) {
        chk = "<input type='checkbox' value=" + obj.title + " checked></input>";
      } else {
        chk = "<input type='checkbox' value=" + obj.title + "></input>";
      }
      chkContainer.innerHTML += chk;
    }
    if (typeof obj[propertyName] === "string") {
      var button =
        "<input type='button' value=" + obj[propertyName] + "></input>";
      btnContainer.innerHTML += button;
    }
  }
}
