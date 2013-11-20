(function(){
  var DOMAIN_REGEXP = /https?:\/\/[\w-]+(\.[\w-]+)+/;
  var MAX_LEN = 32;


  window.ChromePwdGenerator = {
    get_domain: function(url) {
      return url.match(DOMAIN_REGEXP)[0];
    },

    generate_pwd: function(hash, domain, len, range) {
      var pwd = md5(hash + domain);
      if (len >= MAX_LEN) { len = MAX_LEN;}

      if (range) {
        return range_pwd(pwd, len, range);
      } else {
        return pwd.slice(0, len);
      }
    }
  };



  function range_pwd(pwd, len, range) {
    var result = '', t = 0, range_len = range.length;
    
    for (var i = 0; i < len; i++) {
      t += pwd[i].charCodeAt();
      result += range[t % range_len];
    }

    return result;
  }
}());