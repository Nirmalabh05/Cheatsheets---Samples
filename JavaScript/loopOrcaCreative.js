if ((window.location.href.indexOf('orca.adylic.com') > 0 || window.location.href.indexOf('template.adylicorca.com') > 0)) {
    console.log('Orca Logic...');
   } 
   else { 
    if(endLoop < 3 ){   
        setTimeout(function(){
            console.log('calling build data...')
            endLoop++;
            buildData(); 
    }, 2400);}
}