
/**
 * sprite
 */

function playAnimation()
{
  console.log('test');
  
  for(var i = 0; i < document.querySelectorAll('.sprite').length; i++)
  {
    playSprite(document.querySelectorAll('.sprite')[i]);
  }
}

function playSprite(spriteDOM){
  
  var sprite        = spriteDOM;                // sprite container
  var spriteProps   = document.getElementsByClassName('animation-props');     // sprite props container
  var width         = 150; 
  var height        = 120;
  var spriteSpeed   = 50;
  var numberLeft    = (sprite.offsetWidth / width) - 1;                               // n * left movement
  var numberTop     = (sprite.offsetHeight / height) - 3;                             // n * top movement
  var leftCount     = 0;                                                             
  var leftMovement  = 0;                                                             
  var topCount      = 0;
  var topMovement   = 0;
  var refreshInterval = setInterval(function () {

    if (leftCount <= numberLeft){
      sprite.style.left = leftMovement + 'px';
      leftMovement = leftMovement - width;
    }
    else if (leftCount > numberLeft && topCount <= numberTop){
      topMovement = topMovement - height;
      sprite.style.top = topMovement + 'px';
      leftCount = 0;
      leftMovement = 0;
      sprite.style.left = leftMovement + 'px';
      topCount++;
    }
    else{
      playSprite(spriteDOM);
      sprite.style.left = "0";
      sprite.style.top = "0";
      clearInterval(refreshInterval);
    }
    leftCount++;
  }, spriteSpeed);
};

setTimeout(playAnimation, 100);
