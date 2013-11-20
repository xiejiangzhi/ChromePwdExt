(function(){
  var init_view = document.getElementById('init_view');
  var generator_view = document.getElementById('generator_view');
  var message_box = document.getElementById('message_box');




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
    message_box.innerHTML = '';

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
        message_box.innerHTML = 'Please input password.';
        return false;
      }


      if (pwdin.value == repeat_pwd_in.value) {
        return true;
      } else {
        message_box.innerHTML = 'Two password no same.';
        return false;  
      }
    }
  }






  function run_generator_view(){
    init_view.style.display = "none";
    generator_view.style.display = null;
    message_box.innerHTML = '';

    var domain_in = document.getElementById('domain_in');
    var pwdlen = document.getElementById('pwd_len');
    var pwdout = document.getElementById('pwd_out');
    var gbtn = document.getElementById('generate_btn');
    var reset = document.getElementById('reset');

    // PWD range
    var pwd_range_inputs = document.getElementsByName('pwd_range');
    var use_pwd_range = document.getElementById('use_pwd_range');

    chrome.tabs.query({active: true, currentWindow: true}, function(data){
      domain_in.value = ChromePwdGenerator.get_domain(data[0].url);
    });

    pwdlen.value = 16;

    gbtn.onclick = function(){
      var domain = domain_in.value;
      chrome.storage.sync.get(function(data){
        pwdout.value = ChromePwdGenerator.generate_pwd(
          data.password_hash, domain, pwdlen.value, pwd_range()
        );
      });
    };


    reset.onclick = function(){
      run_init_view();
    }



    // use pwd range
    use_pwd_range.onclick = function(){
      if (use_pwd_range.checked) {
        for (var i = 0; i < pwd_range_inputs.length; i++) {
          pwd_range_inputs[i].disabled = true;
        }
      } else {
        for (var i = 0; i < pwd_range_inputs.length; i++) {
          pwd_range_inputs[i].disabled = false;
        }
      }
    }



    function pwd_range(){
      if (use_pwd_range.checked) { return null; }

      var range = '';
      for (var i = 0; i < pwd_range_inputs.length; i++) {
        var el = pwd_range_inputs[i];
        if (el.type == 'checkbox' && el.checked) {
          range += range_values(el.value);
        } else if (el.type == 'text') {
          range += el.value;
        }
      }

      return range.length > 0 ? range : null;
    }

    function range_values(name) {
      switch(name) {
      case "Number":
        return "123456789";
      case "Char":
        return "abcdefghijklnmopqrstuvwxyz";
      case "Upcase":
        return "ABCDEFGHIJKLNMOPQRSTUVWXYZ";
      case "Symbol":
        return "~!@#$%^&*()_+-=[]{};':\",./<>?";
      default:
        return "";
      }
    }
  }
  
}());
