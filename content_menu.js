(function(){
  var id = chrome.contextMenus.create({
    "title": "Generate Password",
    "contexts": ["editable"],
    "onclick": genericOnClick
  });



  function genericOnClick(info, tab) {
    chrome.tabs.executeScript({code: 'console.log(' + info.srcUrl + ')'});

    chrome.tabs.sendRequest(tab.id, {
      method: 'paste',
      info: info,
      tab: tab
    }, function(){});
  }
}());
