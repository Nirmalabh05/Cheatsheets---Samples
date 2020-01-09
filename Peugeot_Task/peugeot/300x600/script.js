// Reference to the creative's various properties and elements.
var creative = {};


function preInit () {
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


function setupDom () {
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
}


function init() {
  addListeners();
  // Polite loading
  if (Enabler.isVisible()) {
    show();
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, show);
  }
}


function runAnimation(){
  setTimeout(function(){
    document.querySelector('.mask').style.opacity = 1;
  }, 13000);

  setTimeout(function(){

    document.getElementById('end-frame').style.opacity = 1;
    setTimeout(function(){
        document.querySelector('.top-copy').style.opacity = 1;
    }, 500);

    setTimeout(function(){
      document.querySelector('.sub-copy').style.opacity = 1;
      document.querySelector('.awardLogo1').style.opacity = 1;
      document.querySelector('.awardLogo2').style.opacity = 1;
    }, 1000);

    setTimeout(function(){
      animateCTA();
    }, 3000);

    setTimeout(function(){
      document.querySelector('.cta-text-animate').style.transform = 'translateY(0px)';
    }, 4000);
  }, 14000);
}

function animateCTA()
{
  document.querySelector('.top-line').style.width  = "160px";
  document.querySelector('.bottom-line').style.width   = "160px";
  setTimeout(function(){
    document.querySelector('.left-line').style.height   = "36px";
    document.querySelector('.right-line').style.height  = "36px";
   }, 700);
}

function addListeners () {
  creative.dom.mainContainer.addEventListener('click', exitClickHandler);
}

function show () {
  creative.dom.mainContainer.style.display = 'block';

    var video1 = document.getElementById('media-video');

  Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
    studio.video.Reporter.attach('video', video1);
  });
  
  runAnimation();
}


function exitClickHandler() {
  Enabler.exit('exit',  'https://business.peugeot.co.uk/showroom/new-peugeot-partner/');
}


window.addEventListener('load', preInit);