var timerInterval;

function runCuntdown(countdown){
  clearInterval(timerInterval)
  timerInterval = setInterval(cDown, 1000);
}

function cDown(){
  // TODO: remove below line

  var countdown = document.querySelector('.countdown').innerHTML;

  if(typeof countdown !== undefined){

    var countDownDate = new Date(countdown).getTime();

    // Get todays date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;    
  }
}

function init(){ 
  runCuntdown();
}

init();