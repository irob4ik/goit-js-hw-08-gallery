import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');
const galleryMarkup = createGallery(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', onGalleryClick);
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', overlayOnClick);

function createGallery(items) {
    return items.map(({preview, original, description}) => {
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
    
    openModal();
    setImgAttributes(evt);    
}

function openModal() {
    window.addEventListener('keydown', onEscKeyPress);
    const galleryLightbox = document.querySelector('.js-lightbox');
    
    galleryLightbox.classList.add('is-open');    
}

function setImgAttributes(evt) {
    const source = evt.target.getAttribute('data-source');
    const alt = evt.target.getAttribute('alt');
    const modalImage = document.querySelector('.lightbox__image');

    modalImage.setAttribute('src', source);
    modalImage.setAttribute('alt', alt);
}

function closeModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    const galleryLightbox = document.querySelector('.js-lightbox');
    const refreshContent = document.querySelector('.lightbox__image');
    
    galleryLightbox.classList.remove('is-open');
    refreshContent.setAttribute('src', "#");
    refreshContent.setAttribute('alt', "#");
}

function overlayOnClick(evt) {
    if (evt.target !== evt.currentTarget) {
        return;
    }
    closeModal();
}

function onEscKeyPress(evt) {
    if (evt.code === "Escape") {
        closeModal();
    }
}
