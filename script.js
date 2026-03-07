// ─── Telegram Bot Config ────────────────────────────────────────
const TG_TOKEN = ""; // 7123456789:AAHxxx...
const TG_CHAT_ID = ""; // 123456789

// ─── Mobile menu ───────────────────────────────────────────────
const menuToggleElement = document.getElementById("menu-toggle");
const navLinksElement = document.getElementById("nav-links");

if (menuToggleElement && navLinksElement) {
  menuToggleElement.addEventListener("click", () => {
    const isOpen = navLinksElement.classList.toggle("is-open");
    menuToggleElement.setAttribute("aria-expanded", String(isOpen));
  });

  navLinksElement.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksElement.classList.remove("is-open");
      menuToggleElement.setAttribute("aria-expanded", "false");
    });
  });
}

// ─── Booking form ───────────────────────────────────────────────
const bookingFormElement = document.getElementById("booking-form");
const formNoteElement = document.getElementById("form-note");

// Минимальная дата = сегодня
(function setMinDate() {
  const dateInput = document.getElementById("field-date");
  if (dateInput) {
    dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
  }
})();

// ─── Phone field: + в начале, только цифры ─────────────────────
const phoneInput = document.getElementById("field-phone");
if (phoneInput) {
  phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value) phoneInput.value = "+";
  });

  phoneInput.addEventListener("keydown", (e) => {
    const servicKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
    ];
    if (servicKeys.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });

  phoneInput.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const digits = pasted.replace(/\D/g, "");
    phoneInput.value = "+" + digits;
  });

  phoneInput.addEventListener("input", () => {
    let val = phoneInput.value;
    const digits = val.replace(/[^\d]/g, "");
    phoneInput.value = "+" + digits;
    if (phoneInput.value === "+" && val === "") phoneInput.value = "";
  });
}

// ─── Helpers ────────────────────────────────────────────────────
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorId = "error-" + fieldId.replace("field-", "");
  const errorEl = document.getElementById(errorId);
  if (field) {
    field.classList.add("is-invalid");
    field.setAttribute("aria-describedby", errorId);
    field.setAttribute("aria-invalid", "true");
  }
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorId = "error-" + fieldId.replace("field-", "");
  const errorEl = document.getElementById(errorId);
  if (field) {
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-describedby");
    field.removeAttribute("aria-invalid");
  }
  if (errorEl) errorEl.textContent = "";
}

// ─── Validators ─────────────────────────────────────────────────

function validateName(value) {
  const v = (value || "").trim();
  if (!v) return "Введите ваше имя";
  if (v.length < 2) return "Имя слишком короткое — минимум 2 символа";
  if (!/^[\p{L}\s\-']+$/u.test(v)) return "Имя содержит недопустимые символы";
  return null;
}

function validatePhone(value) {
  const v = (value || "").trim();
  if (!v || v === "+") return "Введите номер телефона";
  if (!/^\+\d{7,15}$/.test(v))
    return "Формат: + и от 7 до 15 цифр, например +79991234567";
  return null;
}

function validateEmail(value) {
  const v = (value || "").trim();
  if (!v) return "Введите email";
  const re =
    /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+\-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  if (!re.test(v)) return "Введите корректный email, например name@example.com";
  if (v.includes("..")) return "Email не должен содержать две точки подряд";
  return null;
}

function validateDate(value) {
  if (!value) return "Выберите желаемую дату";
  const today = new Date().toISOString().split("T")[0];
  if (value < today) return "Дата не может быть в прошлом";
  return null;
}

function validateGuests(value) {
  const n = Number(value);
  if (value === "" || isNaN(n)) return "Укажите количество человек";
  if (!Number.isInteger(n)) return "Введите целое число";
  if (n < 1 || n > 10) return "Допустимо от 1 до 10 человек";
  return null;
}

// Конфигурация полей: [fieldId, name-атрибут, validator]
const FIELDS = [
  ["field-name", "name", validateName],
  ["field-phone", "phone", validatePhone],
  ["field-email", "email", validateEmail],
  ["field-date", "date", validateDate],
  ["field-guests", "guests", validateGuests],
];

function validateForm(formData) {
  let isValid = true;
  let firstInvalidId = null;

  FIELDS.forEach(([fieldId, fieldName, validator]) => {
    clearFieldError(fieldId);
    const error = validator(formData.get(fieldName));
    if (error) {
      showFieldError(fieldId, error);
      if (!firstInvalidId) firstInvalidId = fieldId;
      isValid = false;
    }
  });

  if (firstInvalidId) {
    const el = document.getElementById(firstInvalidId);
    if (el) el.focus();
  }

  return isValid;
}

// ─── Form events ────────────────────────────────────────────────
if (bookingFormElement && formNoteElement) {
  // Inline-валидация при потере фокуса (blur)
  FIELDS.forEach(([fieldId, fieldName, validator]) => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.addEventListener("blur", () => {
      clearFieldError(fieldId);
      const fd = new FormData(bookingFormElement);
      const error = validator(fd.get(fieldName));
      if (error) showFieldError(fieldId, error);
    });

    field.addEventListener("input", () => clearFieldError(fieldId));
  });

  bookingFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    formNoteElement.textContent = "";
    formNoteElement.className = "form-note";

    const formData = new FormData(bookingFormElement);
    if (!validateForm(formData)) return;

    // Кнопка — в состояние загрузки
    const submitBtn = bookingFormElement.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Отправка...";

    const name = (formData.get("name") || "").trim();
    const phone = (formData.get("phone") || "").trim();
    const email = (formData.get("email") || "").trim();
    const date = formData.get("date") || "";
    const guests = formData.get("guests") || "";
    const comment = (formData.get("comment") || "").trim();

    // Форматируем дату в читаемый вид
    const dateLabel = date
      ? new Date(date).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";

    // Текст сообщения в Telegram
    const text = [
      `🎣 *Новая заявка — Grand Varzuga Camp*`,
      ``,
      `👤 *Имя:* ${name}`,
      `📞 *Телефон:* ${phone}`,
      `📧 *Email:* ${email}`,
      `📅 *Дата тура:* ${dateLabel}`,
      `👥 *Гостей:* ${guests}`,
      comment ? `💬 *Комментарий:* ${comment}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            text,
            parse_mode: "Markdown",
          }),
        },
      );

      const data = await res.json();

      if (data.ok) {
        formNoteElement.textContent = `Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`;
        formNoteElement.classList.add("form-note--success");
        bookingFormElement.reset();
        if (phoneInput) phoneInput.value = "";
      } else {
        throw new Error(data.description);
      }
    } catch (err) {
      formNoteElement.textContent = "Ошибка отправки. Позвоните нам напрямую.";
      formNoteElement.classList.add("form-note--error");
      console.error("TG error:", err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Отправить заявку";
      formNoteElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

// ─── Gallery toggle ─────────────────────────────────────────────
const galleryGridElement = document.getElementById("gallery-grid");
const galleryToggleElement = document.getElementById("gallery-toggle");

if (galleryGridElement && galleryToggleElement) {
  let isGalleryExpanded = false;
  const galleryFigures = galleryGridElement.querySelectorAll("figure");

  if (galleryFigures.length <= 6) {
    galleryToggleElement.hidden = true;
  } else {
    const updateGalleryState = () => {
      galleryGridElement.classList.toggle("is-expanded", isGalleryExpanded);
      galleryGridElement.classList.toggle(
        "gallery-grid--collapsed",
        !isGalleryExpanded,
      );
      galleryToggleElement.textContent = isGalleryExpanded
        ? "Скрыть часть фотографий"
        : "Показать всю галерею";
      galleryToggleElement.setAttribute(
        "aria-expanded",
        String(isGalleryExpanded),
      );
    };

    galleryToggleElement.addEventListener("click", () => {
      isGalleryExpanded = !isGalleryExpanded;
      updateGalleryState();
    });

    updateGalleryState();
  }
}
