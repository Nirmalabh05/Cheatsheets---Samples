// Reference to the creative's various properties and elements.
var creative        = {};
var dynamicBuilder  = {};
dynamicBuilder.data = [];
/**
 * Set up references to DOM elements.
 */
function setupDom() {
  creative.dom                = {};
  creative.dom.mainContainer  = document.querySelector('.dynamicAdvertContainer');
  creative.dom.data           = {};
  creative.dom.data.url       = "json/template.json";
}

function init() {
  setupDom();
  buildData();
}

function addListener()
{
  document.querySelector('.dynamicAdvertContainer').addEventListener('click', function(){
    exitEvent();
  });
}

function buildData() {
  var xobj  = new XMLHttpRequest();
  var url   = creative.dom.data.url;
  xobj.overrideMimeType('application/json');
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == '200') {
      var data = xobj.responseText;
      dynamicBuilder.data = JSON.parse(data);
      buildDOM('.dynamicAdvertContainer', dynamicBuilder.data);
      // Polite loading
      show();
    }
  };
  xobj.send(null);
}
/**
 *  Shows the ad.
 */
function show() {
  creative.dom.mainContainer.style.display = 'block';
  startAnimation(0);
}

function exitClickHandler()
{
  window.open(clickTag)
}

/**
 *  Main onload handler
 */
window.addEventListener('load', init);
