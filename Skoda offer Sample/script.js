function handleBoxAnimation(){
    var boxes = document.querySelectorAll('.boxes');
    var plusSymbol = document.querySelectorAll('.symbol');
  
    setTimeout(function(){
      boxes[0].style.opacity = 1;
    }, 500);
    
    setTimeout(function(){
        plusSymbol[0].style.opacity = 1;
    }, 1000);
  
    setTimeout(function(){
      boxes[1].style.opacity = 1; 
    }, 1500);

    setTimeout(function(){
        plusSymbol[1].style.opacity = 1;
    }, 2000);

    setTimeout(function(){
      boxes[2].style.opacity = 1;  
    }, 2500);
  
    setTimeout(function(){
        plusSymbol[2].style.opacity = 1;
    }, 3000);

    setTimeout(function(){
      boxes[3].style.opacity = 1;
    }, 3500);
  }
  
  handleBoxAnimation();