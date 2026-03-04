const menuToggleElement = document.getElementById('menu-toggle');
const navLinksElement = document.getElementById('nav-links');
const bookingFormElement = document.getElementById('booking-form');
const formNoteElement = document.getElementById('form-note');

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
