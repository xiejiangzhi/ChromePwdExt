(function(){
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    switch(request.method) {
    case 'paste':
      chrome.storage.sync.get(function(data){
        var domain = ChromePwdGenerator.get_domain(location.href);
        var pwd = ChromePwdGenerator.generate_pwd(data.password_hash, domain, 16);

        document.activeElement.value += pwd;
      });

      sendResponse({ok: true});
    }
  });
}());
