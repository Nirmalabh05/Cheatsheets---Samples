document.querySelector('.Frame2_Copy').innerHTML = dynamicContent.Warner_Brothers_AlwaysOn_Feed[0].Frame2_Copy;
document.querySelector('.Frame2_Copy').style.cssText += dynamicContent.Warner_Brothers_AlwaysOn_Feed[0].Frame2_CopyStyle;

document.querySelector('.F2_background').style.backgroundImage = 'url(' + dynamicContent.Warner_Brothers_AlwaysOn_Feed[0].Frame2_BGImage + ')';

document.querySelector('.badge').src = dynamicContent.Warner_Brothers_AlwaysOn_Feed[0].Frame2_LogoImage;
document.querySelector('.badge').style.cssText += dynamicContent.Warner_Brothers_AlwaysOn_Feed[0].Frame2_LogoStyle;

document.querySelector('.F2_legals').style.cssText += dynamicContent.Warner_Brothers_AlwaysOn_Feed[0].Terms_Copy;