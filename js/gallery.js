import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');
const galleryLightbox = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const galleryMarkup = createGallery(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', onGalleryClick);

function createGallery(items) {
    return items.map(({preview, original, description}, index) => {
        return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href=${original}
            >
                <img
                    class="gallery__image"
                    src=${preview}
                    data-source=${original}
                    data-index=${index}
                    alt=${description}
                />
            </a>
        </li>`;   
    }).join('');
}

function onGalleryClick(evt) {
    evt.preventDefault();

    if (evt.target === evt.currentTarget) {
        return;
    }
    
    openModal(evt);    
}

function openModal(evt) {
    window.addEventListener('keydown', onKeyPress);
    closeModalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', overlayOnClick);
    
    galleryLightbox.classList.add('is-open');

    const source = evt.target.getAttribute('data-source');
    const alt = evt.target.getAttribute('alt');
    const index = evt.target.getAttribute('data-index');
    
    setImgAttributes(source, alt, index);
}

function setImgAttributes(source, alt, index) {
    modalImage.setAttribute('src', source);
    modalImage.setAttribute('alt', alt);
    modalImage.setAttribute('data-index', index);
}

function closeModal() {
    window.removeEventListener('keydown', onKeyPress);
    
    galleryLightbox.classList.remove('is-open');
    modalImage.setAttribute('src', "#");
    modalImage.setAttribute('alt', "#");
}

function overlayOnClick(evt) {
    if (evt.target !== evt.currentTarget) {
        return;
    }
    closeModal();
}

function onKeyPress(evt) {
    let index;
    const currentIndex = modalImage.getAttribute('data-index');
    
    if (evt.code === "Escape") {
        closeModal();
    }

    if (evt.code === "ArrowLeft") {
        if (currentIndex === "0") {
            index = document.getElementsByClassName("gallery__item").length - 1;
        } else {
            index = +currentIndex - 1;
        }

        slideToNewImage(index);
    }

    if (evt.code === "ArrowRight") {
        if (currentIndex === "8") {
            index = 0;
        } else {
            index = +currentIndex + 1;
        }

        slideToNewImage(index);
    }
}

function slideToNewImage(index) {
    const newImage = document.querySelector(`[data-index="${index}"]`)
    const source = newImage.getAttribute('data-source');
    const alt = newImage.getAttribute('alt');
    const indexToMove = newImage.getAttribute('data-index');

    setImgAttributes(source, alt, indexToMove);
}
