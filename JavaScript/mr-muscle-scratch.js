function handlePipes(){
    document.querySelector('.pipe-one').classList.add('animate-right-pipe');
    document.querySelector('.pipe-two').classList.add('animate-left-pipe');    
}
function bubbling (){
    for(var i = 0; i < document.querySelectorAll('.bubble_Container').length; i++)
    {
        document.querySelectorAll('.bubble_Container')[i].style.opacity = '1';
    }
}
function applyDevPipes(){
    console.log('works');
    if(document.querySelector('#pipeRight.dev'))
    {
        document.querySelector('.pipe-one').style.opacity = '1 !important';
        document.querySelector('.pipe-two').style.opacity = '1 !important';
    }
}
function main(){
    setTimeout(handlePipes, 1000);
    setTimeout(bubbling, 1500);
    applyDevPipes();
}
main();