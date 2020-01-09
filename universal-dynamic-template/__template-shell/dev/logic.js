var creative = {};
var dynamicBuilder = {};
dynamicBuilder.data = [];

function preInit() {
    init();
}

function setupDom() {
  creative.dom = {};
  creative.dom.mainContainer = document.querySelector('.dynamicAdvertContainer');
}

function init() {
  setupDom();
  buildData();
}

function buildData() {
  var xobj = new XMLHttpRequest();
  var url = 'assets/' + window.location.href.slice(window.location.href.indexOf('?') + 1) + '.json';
  xobj.overrideMimeType('application/json');
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == '200') {
      var data = xobj.responseText;
      dynamicBuilder.data = JSON.parse(data);
      buildDOM('.dynamicAdvertContainer', dynamicBuilder.data);
        show();
    }
  };
  xobj.send(null);
}

function show() {
  creative.dom.mainContainer.style.display = 'block';
  startAnimation(0);
}

window.addEventListener('load', preInit);
