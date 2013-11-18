(function(){
  var id = chrome.contextMenus.create({
    "title": "Generate Password",
    "contexts": ["editable"],
    "onclick": genericOnClick
  });


  function genericOnClick(info, tab) {
    chrome.tabs.sendRequest(tab.id, {method: 'paste'}, function(){});
  }
}());
