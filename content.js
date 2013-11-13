(function(){
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    console.log(request);
    debugger
    
    switch(request.method) {
    case "paste":
      console.log(123);
      break;
    default:
      console.log('321');
    }
  });
}());
