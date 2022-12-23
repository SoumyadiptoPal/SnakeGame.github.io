var scriptSrc = '/index1.js';
if (screen.width <= 1170)
  scriptSrc = '/index.js';
var script = document.createElement('script');
script.src = scriptSrc;
var body = document.getElementsByTagName('body')[0];
body.appendChild(script);