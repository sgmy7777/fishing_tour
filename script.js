const menuToggleElement = document.getElementById('menu-toggle');
const navLinksElement = document.getElementById('nav-links');
const bookingFormElement = document.getElementById('booking-form');
const formNoteElement = document.getElementById('form-note');
const galleryGridElement = document.getElementById('gallery-grid');
const galleryToggleElement = document.getElementById('gallery-toggle');

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

if (galleryGridElement && galleryToggleElement) {
  let isGalleryExpanded = false;
  const galleryItems = galleryGridElement.querySelectorAll('figure');

  const updateGalleryState = () => {
    galleryGridElement.classList.toggle('is-expanded', isGalleryExpanded);
    galleryGridElement.classList.toggle('gallery-grid--collapsed', !isGalleryExpanded);
    galleryToggleElement.textContent = isGalleryExpanded
      ? 'Скрыть часть фотографий'
      : 'Показать всю галерею';
    galleryToggleElement.setAttribute('aria-expanded', String(isGalleryExpanded));
  };

  if (galleryItems.length <= 6) {
    galleryToggleElement.hidden = true;
  } else {
    galleryToggleElement.addEventListener('click', () => {
      isGalleryExpanded = !isGalleryExpanded;
      updateGalleryState();
    });

    updateGalleryState();
  }
}
