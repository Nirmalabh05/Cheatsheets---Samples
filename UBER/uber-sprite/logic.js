// Reference to the creative's various properties and elements.
var app = {};

// called when window loaded
function preInit() {
    setupDom();
    if (Enabler.isInitialized()) {
        init();
    } else {
        Enabler.addEventListener(
            studio.events.StudioEvent.INIT,
            init
        );
    }
}

// set up dom
function setupDom() {
    app.dom = {};
    app.dom.adContainer = document.getElementById("ad-container");

}

// enabler now initialised, run function to add listeners
function init() {
    addListeners();
    if (Enabler.isVisible()) {
        show();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, show);
    }
}

// add event listeners
function addListeners() {
    app.dom.adContainer.addEventListener('click', exitHandler);
}

// show ad
function show() {
    app.dom.adContainer.style.display = "block";
    startAnimation();
}

function startAnimation() {

    console.log("Start the animation...")
    setTimeout(function() { app.playSprite(); }, 500);
}

// handles the exit
function exitHandler() {
    Enabler.exit('BackgroundExit', clickTag);
}

app.playSprite = function() {
    app.dom.sprite = document.getElementById('sprite');
    app.dom.sprite.style.opacity = "1";
    console.log('play sprite');
    var leftCount = 0;
    var leftMovement = 184;
    var numberLeft = (app.dom.sprite.offsetWidth / 184) - 1;
    var numberTop = (app.dom.sprite.offsetHeight / 74) - 5;
    var topCount = 0;
    var topMovement = 0;

    var refreshInterval = setInterval(function() {
        if (leftCount <= numberLeft) {
            app.dom.sprite.style.left = leftMovement + 'px';
            leftMovement = leftMovement - 184;
            leftCount++;
        } else if (leftCount > numberLeft && topCount <= numberTop) {
            topMovement = topMovement - 74;
            app.dom.sprite.style.top = topMovement + 'px';
            leftCount = 0;
            leftMovement = 0;
            app.dom.sprite.style.left = leftMovement + 'px';
            topCount++;
        } else {
            clearInterval(refreshInterval);
        }
    }, 40);
};



// load preInit on page load
window.addEventListener('load', preInit);