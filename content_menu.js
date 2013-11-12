(function(){
  function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    chrome.tabs.executeScript({code: 'alert(1)'});
    debugger
  }


  var id = chrome.contextMenus.create({
    "title": "Generate Password",
    "contexts": ["editable"],
    "onclick": genericOnClick
  });
}());
