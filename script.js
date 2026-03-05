const menuToggleElement = document.getElementById('menu-toggle');
const navLinksElement = document.getElementById('nav-links');
const bookingFormElement = document.getElementById('booking-form');
const formNoteElement = document.getElementById('form-note');
const galleryCollapsibleElement = document.getElementById('gallery-collapsible');
const galleryGridElement = document.getElementById('gallery-grid');
const galleryToggleElement = document.getElementById('gallery-toggle');
const GALLERY_PREVIEW_COUNT = 6;

if (menuToggleElement && navLinksElement) {
  menuToggleElement.addEventListener('click', () => {
    navLinksElement.classList.toggle('is-open');
  });

  navLinksElement.querySelectorAll('a').forEach((linkElement) => {
    linkElement.addEventListener('click', () => {
      navLinksElement.classList.remove('is-open');
    });
  });
}

if (bookingFormElement && formNoteElement) {
  bookingFormElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(bookingFormElement);
    const name = formData.get('name');

    formNoteElement.textContent = `Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`;
    bookingFormElement.reset();
  });
}

if (galleryCollapsibleElement && galleryGridElement && galleryToggleElement) {
  const galleryItems = Array.from(galleryGridElement.querySelectorAll('figure'));
  let isGalleryExpanded = false;

  const calculatePreviewHeight = () => {
    const previewItem = galleryItems[GALLERY_PREVIEW_COUNT - 1];

    if (!previewItem) {
      return galleryGridElement.scrollHeight;
    }

    return previewItem.offsetTop + previewItem.offsetHeight;
  };

  const setGalleryHeight = () => {
    const targetHeight = isGalleryExpanded ? galleryGridElement.scrollHeight : calculatePreviewHeight();
    galleryCollapsibleElement.style.maxHeight = `${targetHeight}px`;
  };

  const updateToggleLabel = () => {
    galleryToggleElement.textContent = isGalleryExpanded
      ? 'Скрыть часть фотографий'
      : 'Показать всю галерею';
    galleryToggleElement.setAttribute('aria-expanded', String(isGalleryExpanded));
  };

  const initializeGallery = () => {
    if (galleryItems.length <= GALLERY_PREVIEW_COUNT) {
      galleryToggleElement.hidden = true;
      galleryCollapsibleElement.style.maxHeight = `${galleryGridElement.scrollHeight}px`;
      return;
    }

    updateToggleLabel();
    setGalleryHeight();
  };

  galleryToggleElement.addEventListener('click', () => {
    isGalleryExpanded = !isGalleryExpanded;
    updateToggleLabel();
    setGalleryHeight();
  });

  window.addEventListener('resize', setGalleryHeight);
  window.addEventListener('load', setGalleryHeight);

  initializeGallery();
}
