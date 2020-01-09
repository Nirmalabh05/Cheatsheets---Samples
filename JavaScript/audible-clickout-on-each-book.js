// inject images from feed
function handleSetDynamicContent(){
    var book1 = document.querySelector('#book1');
    var book2 = document.querySelector('#book2');
    var book3 = document.querySelector('#book3');
    // book 1 image 
    if(dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_1_ImageURL.Url){
        book1.style.backgroundImage = 'url(' + dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_1_ImageURL.Url +')';
    }
    // book 2 image 
    if(dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_1_ImageURL.Url){
        book2.style.backgroundImage = 'url(' + dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_2_ImageURL.Url +')';
    }
    // book 3 image 
    if(dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_1_ImageURL.Url){
        book3.style.backgroundImage = 'url(' + dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_3_ImageURL.Url +')';
    }
}

function handleExit(){
  // clickout book one 
  document.querySelector('#book1').addEventListener('click', function (){
    Enabler.exitOverride('Book1Exit', dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_1_ExitURL.Url);
  });
  // clickout book two 
  document.querySelector('#book2').addEventListener('click', function (){
    Enabler.exitOverride('Book2Exit', dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_2_ExitURL.Url);
  });
  // clickout book three 
  document.querySelector('#book3').addEventListener('click', function (){
    Enabler.exitOverride('Book3Exit', dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_3_ExitURL.Url);
  });
  // clickout book four 
  if(document.querySelector('#bookExit4')){
    document.querySelector('#bookExit4').addEventListener('click', function (){
      Enabler.exitOverride('Book4Exit', dynamicContent.Audible_Feed_2018_AllTemplates_ASINDataFeed[0].Book_4_ExitURL.Url);
    });
  }
  // main container 
  document.querySelector('.exit').addEventListener('click', exitClickHandler);
}


function handleInit(){
  handleSetDynamicContent();
  handleExit();
}
setTimeout(handleInit, 100);