var tcButton = document.querySelector('.TC_button');
var termsOverlay = document.querySelector('.termsOverlay');
var termsClose = document.querySelector('.termsClose');

function displayTerms() {
    console.log('clicked');
    termsOverlay.style.transform = "translateY(0%)";
};

function closeTerms() {
    console.log('clicked');
    termsOverlay.style.transform = "translateY(100%)";
};

tcButton.addEventListener('click', displayTerms);
termsClose.addEventListener('click', closeTerms);