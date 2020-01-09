var loadedImages = false;
​
var imageURL = ['https://s0.2mdn.net/creatives/assets/2591630/altima-ss-v2.png'];
preloader(imageURL, run);
​
​
function preloader(image, callback) 
{
    if(loadedImages) 
    {
        callback();
        return;
    }
​
    var imageLoadCount = 0;
    for (var i = 0; i < imageURL.length; ++i) 
    {
        var img = new Image();
        img.onload = function() 
        {
            imageLoadCount++
            if (imageLoadCount === imageURL.length ) 
            {
                loadedImages = true;
                callback();
            }
        };
       img.src = image[i];
    }
}
​
function run()
{
    console.log('IMAGES LOADED!');
}