(function(){
  var DOMAIN_REGEXP = /https?:\/\/[\w-]+(\.[\w-]+)+/;

  window.ChromePwdGenerator = {
    get_domain: function(url) {
      return url.match(DOMAIN_REGEXP)[0];
    },

    generate_pwd: function(hash, domain, len) {
      return md5(hash + domain).slice(0, len);
    }
  };
}());