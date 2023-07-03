let count = 10;
const apiKey = "UGDspZoqnPhzb1gHAGELSe5QMwiQAzKAOMGFR_N_V5w";
const unsplashAPIurl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
// HTML Element ref
const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImagesLoaded = 0;

async function fetchPhotos() {
  try {
    photosArray = await (await fetch(unsplashAPIurl)).json();
    displayPhotos();
  } catch (error) {
    alert(error);
  }
}

function displayPhotos() {
  totalImagesLoaded = photosArray.length;
  imagesLoaded = 0;
  photosArray.forEach((photo) => {
    // Anchor
    const anchor = document.createElement("a");
    setAttributes(anchor, {
      href: photo.links.html,
      target: "_blank",
    });
    // Image
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);
    anchor.appendChild(img);
    imgContainer.appendChild(anchor);
  });
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImagesLoaded) {
    ready = true;
    loader.hidden = true;
    count = 20;
  }
}

// utility function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// On load
fetchPhotos();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    fetchPhotos();
  }
});
