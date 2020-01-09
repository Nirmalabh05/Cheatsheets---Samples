function handleTerms(){
  var termsContainer = document.querySelector('.terms-container');
  var termsText = document.querySelector('.terms-text').innerHTML.trim();
  var termsCloseBTN = document.querySelector('.terms-close-btn');
  var termsButton = document.querySelector('.term-open-button');
  if(termsText !== '' && termsText.length > 5){
    termsButton.onmouseenter = function(){
      termsContainer.style.height = '100%';
    }
    termsCloseBTN.onmouseleave = function(){
      termsContainer.style.height = '0%';
    }
  }
}

