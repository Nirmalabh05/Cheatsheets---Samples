(function(){
var carousel = ['assets/gol-ani/details-sweets.png', 'assets/gol-ani/mini-burgers.png', 'assets/gol-ani/sushi.png', 'assets/cheese-platter.png'];
productItemImg = document.querySelectorAll('.productImage');
 for(var i = 0; i < carousel.length; i++){
   productItemImg[i].style.backgroundImage = "url(" + carousel[i] + ")";
 }
})();
setTimeout(function(){
        var amountToMoveBy = 126;
        var transformPos = 0;
        var amountOfMoves = 3;
        var currentInt = 0;
        var carouselInterval = setInterval(function(){
            if(currentInt < amountOfMoves) {
                transformPos += amountToMoveBy;
                currentInt++;
                console.log('transform: ' + transformPos);
                document.querySelector('.productCarousel').style.transform = "translateX(-" + transformPos + "px)";
            } else {
                clearInterval(carouselInterval);
            }
        }, 1500);
}, 1700);
setTimeout(function(){
   document.querySelector('.Frame2_copy2')
}, 1700);