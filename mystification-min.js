var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};var stringMystification=function(a,b){var c=this;b="boolean"===typeof b?b:!0;var d=" \t\r\nABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\u00e0\u00e8\u00e9\u00ec\u00f2\u00f9\u00c0\u00c8\u00c9\u00cc\u00d2\u00d9\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f0123456789.,:;!?\"'`/|\\()[]{}&~*#<>@%_-+=$\u20ac%\u00a3^".split("");this.__proto__.getSupportedCharacters=function(){return d};this.__proto__.getHexSpaceIllegalCharacters=function(){return"0123456789abcdef".split("")};this.__proto__.removeSpecialCharacters=function(a){if("undefined"!==typeof a)return a=String(a),a.replace(/(\r\n\t|\n|\r\t)/gm,"")};this.__proto__.checkForInvalidCharacters=function(a){"undefined"!==typeof a&&a.split("").forEach(function(a){if(-1===c.getSupportedCharacters().indexOf(a))throw TypeError('"'+a+'" is not a supported character.');})};this.__proto__.stringFormatting=function(a){if("undefined"!==typeof a)return c.checkForInvalidCharacters(a),a.normalize()};this.__proto__.returnNewArray=function(a){if("undefined"!==typeof a&&"number"===typeof Number(a)){var b=c.getSupportedCharacters();for(a=Number(a);a>=b.length;)a=Math.abs(a-b.length+1);return[].concat($jscomp.arrayFromIterable(b.slice(a,b.length-1)),$jscomp.arrayFromIterable(b.slice(0,a)))}};a="string"===typeof a?this.keyValueEstimator(a):a;a="number"===typeof a&&Number.isInteger(a)&&1E8>=a?a:0;this.getSecureMode=function(){return b};this.getSeed=function(){return a}};stringMystification.prototype.keyValueEstimator=function(a){if("string"==typeof a&&20>=a.length){var b=this.getSupportedCharacters(),c=b.length-1,d=a.split("").map(function(a){return b.indexOf(a)+1});a=function(a,b){for(var c=[];a>=b;)a/=b,c.push(a);return Math.floor(c.reduce(function(a,b){return a+b})+a)};for(d=Number(d.reduce(function(a,b){return String(a)+String(b)}));d>=c;)d=a(d,c);return"function"==typeof this.getSeed?Math.floor(d+this.getSeed()*Math.PI):Math.floor(d)}};stringMystification.prototype.encode=function(a,b){var c=this;if("undefined"!==typeof a&&"undefined"!==typeof b){a=this.stringFormatting(a);b=this.stringFormatting(b);var d=this.returnNewArray(this.keyValueEstimator(b)),e=a.split("").map(function(a){return d[c.getSupportedCharacters().indexOf(a)]}).join("");return!0===this.getSecureMode()?{result:e,signature:b.split("").map(function(a){return d[c.getSupportedCharacters().indexOf(a)]}).join("")}:e}};stringMystification.prototype.hexEncode=function(a,b,c){if("undefined"!==typeof a&&"undefined"!==typeof b){c="undefined"!==typeof c?c:1;a=this.encode(a,b);for(b=0;b<c;b++)a.result=this.string2hex(a.result),a.signature=this.string2hex(a.signature);return a}};stringMystification.prototype.decode=function(a,b){var c=this;if(!1===this.getSecureMode()){if("undefined"!==typeof a&&"undefined"!==typeof b){a=this.stringFormatting(a);b=this.stringFormatting(b);var d=this.returnNewArray(this.keyValueEstimator(b));return a.split("").map(function(a){return c.getSupportedCharacters()[d.indexOf(a)]}).join("")}}else throw TypeError("This function is disabled.");};stringMystification.prototype.hexDecode=function(a,b,c,d){if("undefined"!==typeof a&&"undefined"!==typeof b&&"undefined"!==typeof c){a=this.hex2string(a);c=this.hex2string(c);d="undefined"!==typeof d?d:1;for(var e=0;e<d-1;e++)a=this.hex2string(a),c=this.hex2string(c);return this.safelyDecode(a,b,c)}};stringMystification.prototype.safelyDecode=function(a,b,c){var d=this;if("undefined"!==typeof a&&"undefined"!==typeof b&&"undefined"!==typeof c){a=this.stringFormatting(a);b=this.stringFormatting(b);c=this.stringFormatting(c);var e=this.returnNewArray(this.keyValueEstimator(b));if(c.split("").map(function(a){return d.getSupportedCharacters()[e.indexOf(a)]}).join("")===b)return a.split("").map(function(a){return d.getSupportedCharacters()[e.indexOf(a)]}).join("");console.error("The signature doesn't match the key!")}};stringMystification.prototype.string2hex=function(a){this.getHexSpaceIllegalCharacters();if("string"==typeof a){var b=this.getSupportedCharacters();a=a.split("").map(function(a){a=b.indexOf(a).toString(16);return 2>a.length?"0"+a:a});return a.join("")}};stringMystification.prototype.hex2num=function(a){if("string"==typeof a&&!isNaN(parseInt(a,16))){var b=new ArrayBuffer(4);(new DataView(b)).setUint32(0,parseInt(a,16),!1);a=(new Uint8Array(b)).slice(1);return[].concat($jscomp.arrayFromIterable(a))[2]}};stringMystification.prototype.hex2string=function(a){var b=this;this.getHexSpaceIllegalCharacters();if("string"==typeof a){var c=this.getSupportedCharacters();a=a.match(/.{1,2}/g);a=a.map(function(a){return c[b.hex2num(a)]});return a.join("")}};