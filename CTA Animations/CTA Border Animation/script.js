setTimeout(function(){
    animateCTA();
}, 1000);

function animateCTA()
{
  document.querySelector('.top-line').style.width  = "160px";
  document.querySelector('.bottom-line').style.width   = "160px";
  setTimeout(function(){
    document.querySelector('.left-line').style.height   = "36px";
    document.querySelector('.right-line').style.height  = "36px";
   }, 850);
}