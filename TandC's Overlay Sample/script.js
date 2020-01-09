var tcButton = document.querySelector('.terms-button');
var termsOverlay = document.querySelector('.termsOverlay');
var termsClose = document.querySelector('.termsClose');
var termsContent = document.querySelector('.termsContent').innerHTML.trim();

function displayTerms() {
    console.log('clicked');
    termsOverlay.style.cssText = "height:250px; transition:0.5s linear;";
};

function closeTerms() {
    console.log('clicked');
    termsOverlay.style.cssText = "height:0px; transition:0.5s linear;";
};

function handleTerms(){
        if(termsContent !== '' && termsContent.length > 0){
            tcButton.addEventListener('click', displayTerms);
        }
        termsClose.addEventListener('click', closeTerms); 
    }  
handleTerms();
