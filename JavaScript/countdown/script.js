function CountDownTimer(dt, id) {
  var end = new Date(dt);

  console.log("End Date:" +  end);

  var second = 1000;
  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var timer;

  function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {
      clearInterval(timer);
      document.querySelector(id).innerHTML = "it has been and gone!";
      return;
    }

    var days = document.querySelector(".countdown-days");
    var hours = document.querySelector(".countdown-hours");
    var minutes = document.querySelector(".countdown-minutes");
    var seconds = document.querySelector(".countdown-seconds");

    var timeRemaining = {};

    timeRemaining.days = Math.floor(distance / day);
    timeRemaining.hours = Math.floor((distance % day) / hour);
    timeRemaining.minutes = Math.floor((distance % hour) / minute);
    timeRemaining.seconds = Math.floor((distance % minute) / second);

    days.innerHTML = timeRemaining.days;
    hours.innerHTML = timeRemaining.hours;
    minutes.innerHTML = timeRemaining.minutes;
    seconds.innerHTML = timeRemaining.seconds;
  }

  timer = setInterval(showRemaining, 1000);
}
CountDownTimer("04/25/2020 00:01 AM", ".countdown");
// document.querySelector('#exit').addEventListener('click', exitClickHandler);
