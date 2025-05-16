const API_KEY = '50323338-d99a3daef9001148f99f6ca32'; 
const URL = `https://pixabay.com/api/?key=${API_KEY}&q=landscape&image_type=photo&per_page=15`;

let currentSlide = 0; 
let images = [];

function fetchImages(){
    fetch(URL)
    .then(response => response.json())
    .then (data => {
        images = data.hits.map(img => img.webformatURL);
        renderCarousel();
    })
}
function renderCarousel() {
    const carousel = document.querySelector(".carousel"); 
    images.forEach(src => {
        const img = document.createElement("img"); 
        img.src = src; 
        img.onclick = () => openModal(src);
        carousel.appendChild(img);
    })

}

function moveSlide(direction) {
    const totalSlides = images.length;
    const containerWidth = document.querySelector(".carousel-container").clientWidth;
    const imageWidth = 210; 
    const maxOffset = -(imageWidth * (totalSlides - Math.floor(containerWidth / imageWidth)));

    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide > totalSlides - Math.floor(containerWidth / imageWidth)) {
        currentSlide = totalSlides - Math.floor(containerWidth / imageWidth);
    }

    const offset = -currentSlide * imageWidth;
    document.querySelector(".carousel").style.transform = `translateX(${offset}px)`;
}



function openModal(src) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg")

    modal.style.display = "block"
    modalImg.src = src;
}

function closeModal(){
    const modal = document.getElementById("modal"); 
    modal.style.display = "none";
}

fetchImages();
