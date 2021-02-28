// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var $li = $siteList.find('li');
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var hasMap = xObject.length !== 0 ? xObject : [{
  logo: 'A',
  url: 'https://www.acfun.cn'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}, {
  logo: 'D',
  url: 'http://www.dasabi99.top'
}];

var removeX = function removeX(url) {
  return url.replace("http://", '').replace("https://", '').replace("www.", '');
};

var render = function render() {
  var $siteList = $('.siteList');
  $siteList.find('li:not(.last)').remove();
  hasMap.forEach(function (node) {
    var $site = $("<li>\n    <a href=\"".concat(node.url, "\" class=\"site\">\n      <div class=\"logo\">").concat(node.logo, "</div>\n      <div class=\"link\">").concat(removeX(node.url), "</div>\n      <div class=\"close\">x</div>\n    </a>\n    </li>")).insertBefore($lastLi);
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请问你要添加的网址是啥？');
  url = url.replace("http://", "").replace("https://", "").replace("www.", "").replace(/\/.*/, "");
  var parseUrl = "";

  if (url.indexOf('http') !== 0) {
    parseUrl = 'http://' + url;
  }

  hasMap.push({
    logo: url[0].toUpperCase(),
    url: parseUrl
  });
  render();
}); // 监听点击关闭按钮，坑：当页面重新渲染后不能监听js创建出来的元素
// 使用事件委托，将监听事件交给父元素

$siteList.on("click", function (e) {
  if (e.target.className === "close") {
    e.preventDefault();
    var url = e.target.parentNode.getAttribute("href");
    var index = hasMap.findIndex(function (v) {
      return v.url == url;
    });
    hasMap.splice(index, 1);
    render();
  }
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hasMap);
  localStorage.setItem('x', string);
};

$(".globalHeader").on("keypress", function (e) {
  e.stopPropagation();
});
$(document).on("keypress", function (e) {
  var key = e.key;

  for (var i = 0; i < hasMap.length; i++) {
    if (hasMap[i].logo.toLowerCase() === key) {
      window.open(hasMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.0b165b5a.js.map