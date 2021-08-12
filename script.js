const imageContainer= document. getElementById('image-container');
const loader=document.getElementById('loader');

let ready= false;
let imagesLoaded= 0;
let totalImages= 0;
let photosArray= [];

// usplash API 
const count=30;
const apiKey='fRqOwI79o4LQni4Qct4IvM7sxYvVCpkNrhkcGrnlGlY';
const apiUrl= `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;
// create elements for links & photos , add to DOM 
// function displayPhotos(){
//     totalImages= photosArray.length;
//     console.log('total images', totalImages);
// }





// check if all images were loaded

function imageLoaded(){
   imagesLoaded++;
//    console.log(imagesLoaded)
   if (imagesLoaded ===  totalImages){
       ready=true;
       loader.hidden=true;
       
   }
}



// helper funciton to set attributes on DOM elements 
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    
// run function for each object in photoarray 
    photosArray.forEach((photo)=>{
// create <a> elements to link to unsplash 
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target','_blank');
    setAttributes(item, {
        href: photo.links.html,
        target:'_blank', 
    });
    // create <img> for photo
    const img= document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img,{
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    })
    // event listener , check when each is finished loading 
    img.addEventListener('load', imageLoaded)







    // put <img> inside <a>  then put both inside imagecontainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    }); 
} 




// get photos from unsplash API 

async function getPhotos(){
    try{
        const reponse =await fetch(apiUrl);
        photosArray = await reponse.json(); 
        // console.log(photosArray )
        displayPhotos(); 
    }catch(error){
        console.log(error)
        // catch error here 
    }
}

// check if the scrolling at the end of the page load more phots


window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 & ready){
    ready=false
    getPhotos();
    }
})


// onload 
getPhotos();