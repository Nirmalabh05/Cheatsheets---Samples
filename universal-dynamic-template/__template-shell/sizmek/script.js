var creative = {};
var dynamicBuilder = {};
dynamicBuilder.data = [];

function startAd() {
  creative.dom = {};
  creative.dom.mainContainer = document.querySelector('.dynamicAdvertContainer');
  //
  // Command to build the data
  //
  adkit.onReady(buildData);
}

function buildData() {
  //
  // This url will be injected dynamically from the Sizmek feed
  //
  var url = document.getElementById('dco_jsonUrl').innerHTML;
  if (url != '' && url != undefined) {
    console.log(url);
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == '200') {
        var data = xobj.responseText;
        var parsedData = JSON.parse(data);
        var target = '.dynamicAdvertContainer';
        //
        // Builds the dom
        //
        buildDOM(target, parsedData);
        show();
      }
    };
    xobj.send(null);
  }
}

function show() {
  creative.dom.mainContainer.style.display = 'block';
  //
  // Begins animation after dom has been constructed
  //
  startAnimation(0);
}

function clickthrough() {
  EB.clickthrough();
}
window.addEventListener('load', startAd);
