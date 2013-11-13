(function(){
  var init_view = document.getElementById('init_view');
  var generator_view = document.getElementById('generator_view');




  chrome.storage.sync.get(function(data){
    if (data.password_hash) {
      run_generator_view();
    } else {
      run_init_view();
    }
  });




  function run_init_view(){
    generator_view.style.display = "none";
    init_view.style.display = null;

    var pwdin = document.getElementById('pwd_in');
    var repeat_pwd_in = document.getElementById('repeat_pwd_in');
    var salt_in = document.getElementById('salt_in');
    var save_btn = document.getElementById('save_pwd');

    save_btn.onclick = function(){
      if (!valid_password()) {
        return false;
      }

      chrome.storage.sync.set({
        password_hash: md5(pwdin.value + salt_in.value)
      }, function(){
        run_generator_view();
      });
    }


    function valid_password(){
      if (pwdin.value.length == 0) {
        alert('Please input password.');
        return false;
      }


      if (pwdin.value == repeat_pwd_in.value) {
        return true;
      } else {
        alert('Two password no same.');
        return false;  
      }
    }
  }






  function run_generator_view(){
    init_view.style.display = "none";
    generator_view.style.display = null;

    var domain_in = document.getElementById('domain_in');
    var pwdout = document.getElementById('pwd_out');
    var gbtn = document.getElementById('generate_btn');
    var reset = document.getElementById('reset');

    chrome.tabs.query({active: true, currentWindow: true}, function(data){
      set_domain(data[0]);
    })

    gbtn.onclick = function(){
      var domain = domain_in.value;
      chrome.storage.sync.get(function(data){
        pwdout.value = md5(data.password_hash + domain).slice(0, 16);
      });
    };


    reset.onclick = function(){
      run_init_view();
    }


    function set_domain(win){
      domain_in.value = win.url.match(/https?:\/\/[\w-]+(\.[\w-]+)+/)[0];
    }
  }
  
}());

