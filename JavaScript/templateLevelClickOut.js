document.getElementById('exit').onclick = function () {
    if ((document.location.host ==='orca.adylic.com') || (document.location.host === 'template.adylicorca.com')) {
        console.log('Click firing - template level');
    }
    else{
        exitClickHandler();
    }
};