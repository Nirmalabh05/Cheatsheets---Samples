// Reference to the creative's various properties and elements.
var creative = {};
var dynamicBuilder = {};
dynamicBuilder.data = [];
/**
 * Called on the window load event.
 */
function preInit() {
    if (Enabler.isInitialized()) {
        init();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
    }
}
/**
 * Set up references to DOM elements.
 */
function setupDom() {
    creative.dom = {};
    creative.dom.mainContainer = document.querySelector('.dynamicAdvertContainer');
    creative.dom.data = {};
    creative.dom.data.url = 'json/coop_summer_value_copy_300x250_with_cta.json';
    creative.dom.exit = document.getElementById('exit');
    // creative.dom.url = 'https://www.coop.co.uk/';
}
/**
 * The Enabler is now initialized and any extra modules have been loaded.
 */
function init() {
    setupDom();
    // addListeners();
    buildData();
}

function buildData() {
    var xobj = new XMLHttpRequest();
    var url = creative.dom.data.url;
    xobj.overrideMimeType('application/json');
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            var data = xobj.responseText;
            dynamicBuilder.data = JSON.parse(data);
            buildDOM('.dynamicAdvertContainer', dynamicBuilder.data);
            // Polite loading
            if (Enabler.isVisible()) {
                show();
            } else {
                Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, show);
            }
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

// function addListeners() {
//     creative.dom.mainContainer.addEventListener('click', exitClickHandler)
// }

function exitClickHandler() {
    Enabler.exit('BackgroundExit');
    // Enabler.exit('BackgroundExit', creative.dom.url);
}


function termsClickHandler() {
    Enabler.exitOverride('TermsExit', 'https://www.easyjet.com/de/terms-and-conditions');
}
/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);