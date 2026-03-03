# План разработки сайта для рыболовного тура

## 📋 Обзор проекта

**Цель**: Создать landing page для рекламы рыболовного тура с информацией, фотогалереей и формой записи.

**Целевая аудитория**: Любители рыбалки, туристы, группы друзей

**Ключевые функции**:
- Информация о туре
- Фотогалерея
- Форма бронирования/записи
- Контактная информация

---

## 🎯 Этап 1: Планирование и дизайн (1-2 дня)

### 1.1 Определение структуры сайта

#### Основные секции:
1. **Hero Section (Главный экран)**
   - Захватывающее фото рыбалки
   - Заголовок и короткое описание
   - CTA кнопка "Забронировать тур"

2. **О туре (About)**
   - Описание тура
   - Что включено в стоимость
   - Продолжительность
   - Локация
   - Маршрут

3. **Программа тура (Itinerary)**
   - День 1, День 2, и т.д.
   - Расписание мероприятий
   - Что взять с собой

4. **Фотогалерея (Gallery)**
   - Интерактивная галерея с фото
   - Возможность просмотра в полном размере
   - Категории: природа, рыбалка, улов, лагерь

5. **Цены и условия (Pricing)**
   - Стоимость тура
   - Варианты (групповой/индивидуальный)
   - Что входит в стоимость
   - Условия отмены

6. **Форма записи (Booking Form)**
   - Персональные данные
   - Выбор даты тура
   - Количество человек
   - Дополнительные услуги
   - Контактная информация

7. **Отзывы (Testimonials)**
   - Отзывы клиентов
   - Рейтинги
   - Фото довольных туристов

8. **FAQ (Часто задаваемые вопросы)**
   - Популярные вопросы и ответы

9. **Контакты (Contact)**
   - Телефон, email
   - Социальные сети
   - Карта локации

10. **Footer**
    - Копирайт
    - Ссылки на соцсети
    - Дополнительная информация

### 1.2 Сбор контента

#### Текстовый контент:
- [ ] Описание тура (400-600 слов)
- [ ] Программа по дням
- [ ] Список того, что включено
- [ ] Правила и условия
- [ ] FAQ (минимум 5-8 вопросов)
- [ ] Информация о гиде/компании

#### Визуальный контент:
- [ ] Логотип компании
- [ ] Hero изображение (высокое качество, 1920x1080px минимум)
- [ ] 15-30 фотографий для галереи
- [ ] Фото локации
- [ ] Фото улова
- [ ] Фото команды/гида

#### Дополнительная информация:
- [ ] Контактные данные (телефон, email, адрес)
- [ ] Социальные сети (ссылки)
- [ ] Цены
- [ ] Доступные даты туров

### 1.3 Выбор цветовой схемы и стиля

#### Рекомендуемая палитра для рыболовной тематики:
```
Основные цвета:
- Синий (вода): #1E3A8A, #3B82F6
- Зеленый (природа): #065F46, #10B981
- Песочный/Бежевый: #D97706, #F59E0B
- Нейтральные: #1F2937, #F9FAFB

Акцентные цвета:
- Оранжевый (призыв к действию): #EA580C
- Белый: #FFFFFF
```

#### Типографика:
- Заголовки: Montserrat, Roboto, Poppins (bold, жирные)
- Основной текст: Inter, Open Sans (легко читаемые)

---

## 🛠️ Этап 2: Выбор технологического стека (30 минут)

### Вариант 1: Простой и быстрый (рекомендуется для начала)
```
Frontend:
- React + Vite
- TypeScript
- Tailwind CSS
- React Hook Form (для формы)
- Zod (валидация)
- Framer Motion (анимации)
- react-photo-view или yet-another-react-lightbox (галерея)

Форма:
- EmailJS или Web3Forms (отправка email без backend)
- Google Forms встроенная форма (простейший вариант)

Хостинг:
- Vercel или Netlify (бесплатно)
```

### Вариант 2: С backend (если нужна база данных бронирований)
```
Frontend: (то же самое)

Backend:
- Node.js + Express
- PostgreSQL или MongoDB
- Nodemailer (отправка email)

Хостинг:
- Frontend: Vercel/Netlify
- Backend: Railway, Render, или Heroku
```

### Вариант 3: No-code / Low-code (самый быстрый)
```
- Webflow или Tilda
- Встроенная форма
- Готовые шаблоны
```

**Рекомендация**: Начните с Варианта 1 (React + Vite + Tailwind). Это оптимальный баланс между функциональностью и скоростью разработки.

---

## 💻 Этап 3: Настройка проекта (1-2 часа)

### 3.1 Инициализация проекта

```bash
# Создание проекта
npm create vite@latest fishing-tour-site -- --template react-ts

cd fishing-tour-site

# Установка зависимостей
npm install

# Установка Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Установка дополнительных библиотек
npm install react-hook-form zod @hookform/resolvers
npm install framer-motion
npm install lucide-react
npm install react-photo-view
npm install emailjs-com

# Dev зависимости
npm install -D @types/node
```

### 3.2 Структура проекта

```
fishing-tour-site/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── gallery/
│   │   ├── icons/
│   │   └── logo.svg
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── BookingSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ImageGallery.tsx
│   │   └── forms/
│   │       ├── BookingForm.tsx
│   │       └── ContactForm.tsx
│   ├── hooks/
│   │   ├── useScrollSpy.ts
│   │   └── useIntersectionObserver.ts
│   ├── types/
│   │   └── index.ts
│   ├── constants/
│   │   └── tourData.ts
│   ├── utils/
│   │   └── emailService.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

### 3.3 Конфигурация Tailwind CSS

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        nature: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

## 🎨 Этап 4: Разработка UI компонентов (3-5 дней)

### 4.1 Порядок разработки секций

#### День 1: Базовые компоненты и Layout
- [ ] Header с навигацией
- [ ] Footer
- [ ] Базовые UI компоненты (Button, Card, Input)
- [ ] Hero Section

#### День 2: Информационные секции
- [ ] About Section (информация о туре)
- [ ] Itinerary Section (программа)
- [ ] Pricing Section (цены)

#### День 3: Интерактивные компоненты
- [ ] Gallery Section (фотогалерея с лайтбоксом)
- [ ] Testimonials Section (отзывы с каруселью)
- [ ] FAQ Section (аккордеон)

#### День 4: Форма бронирования
- [ ] Booking Form с валидацией
- [ ] Интеграция с EmailJS
- [ ] Success/Error модалки
- [ ] Contact Section

#### День 5: Полировка
- [ ] Адаптивность (mobile/tablet/desktop)
- [ ] Анимации (Framer Motion)
- [ ] Оптимизация изображений
- [ ] Тестирование форм

### 4.2 Пример структуры компонента Hero Section

```typescript
// src/components/sections/HeroSection.tsx
import { motion } from 'framer-motion';
import { Fish, Calendar, Users } from 'lucide-react';

export const HeroSection = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero/fishing-lake.jpg" 
          alt="Рыбалка на озере"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Незабываемая рыбалка в дикой природе
          </h1>
          <p className="text-xl mb-8">
            Присоединяйтесь к нашему 3-дневному рыболовному туру 
            на живописном озере в окружении гор
          </p>

          {/* Features */}
          <div className="flex gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>3 дня / 2 ночи</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>До 12 человек</span>
            </div>
            <div className="flex items-center gap-2">
              <Fish className="w-5 h-5" />
              <span>Гарантия улова</span>
            </div>
          </div>

          <button
            onClick={scrollToBooking}
            className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Забронировать тур
          </button>
        </motion.div>
      </div>
    </section>
  );
};
```

### 4.3 Пример формы бронирования

```typescript
// src/components/forms/BookingForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from 'emailjs-com';

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Неверный формат email'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  tourDate: z.string().min(1, 'Выберите дату тура'),
  numberOfPeople: z.number().min(1).max(12),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        data,
        'YOUR_PUBLIC_KEY'
      );
      
      alert('Заявка успешно отправлена!');
      reset();
    } catch (error) {
      alert('Ошибка отправки. Попробуйте позже.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Поля формы */}
      <div>
        <label className="block mb-2">Полное имя</label>
        <input
          {...register('fullName')}
          className="w-full px-4 py-3 border rounded-lg"
          placeholder="Иван Иванов"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Остальные поля... */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
};
```

---

## 📸 Этап 5: Реализация фотогалереи (1 день)

### 5.1 Установка библиотеки

```bash
npm install react-photo-view
```

### 5.2 Компонент галереи

```typescript
// src/components/sections/GallerySection.tsx
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const galleryImages = [
  { id: 1, src: '/images/gallery/catch-1.jpg', alt: 'Улов 1' },
  { id: 2, src: '/images/gallery/lake-view.jpg', alt: 'Вид на озеро' },
  // ... остальные фото
];

export const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-display font-bold text-center mb-12">
          Фотогалерея
        </h2>

        <PhotoProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <PhotoView key={image.id} src={image.src}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                />
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      </div>
    </section>
  );
};
```

---

## 🔧 Этап 6: Интеграция Email сервиса (2-3 часа)

### 6.1 Настройка EmailJS

1. Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/)
2. Создайте email сервис (Gmail, Outlook и т.д.)
3. Создайте email template
4. Получите Service ID, Template ID, и Public Key

### 6.2 Шаблон email

```
Новая заявка на рыболовный тур!

Имя: {{fullName}}
Email: {{email}}
Телефон: {{phone}}
Дата тура: {{tourDate}}
Количество человек: {{numberOfPeople}}

Дополнительное сообщение:
{{message}}
```

### 6.3 Переменные окружения

```env
# .env.local
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🎯 Этап 7: Оптимизация и финальные штрихи (2-3 дня)

### 7.1 Оптимизация изображений

```bash
# Установка sharp для оптимизации
npm install -D sharp

# Или используйте онлайн инструменты:
# - TinyPNG (https://tinypng.com/)
# - Squoosh (https://squoosh.app/)
```

**Рекомендации**:
- Hero изображения: WebP формат, 1920x1080px, качество 80%
- Галерея: WebP формат, 800x600px, качество 75%
- Используйте lazy loading для изображений

### 7.2 SEO оптимизация

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>Рыболовный тур - Незабываемая рыбалка в дикой природе</title>
  <meta name="description" content="Присоединяйтесь к нашему 3-дневному рыболовному туру на живописном озере. Профессиональные гиды, качественное снаряжение, гарантия улова." />
  <meta name="keywords" content="рыбалка, рыболовный тур, рыбалка на озере, туры, активный отдых" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Рыболовный тур - Незабываемая рыбалка" />
  <meta property="og:description" content="3-дневный рыболовный тур на живописном озере" />
  <meta property="og:image" content="/images/og-image.jpg" />
  
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />
</head>
```

### 7.3 Адаптивность (Responsive Design)

Проверьте отображение на всех устройствах:
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)

```typescript
// Пример адаптивных классов Tailwind
<div className="
  px-4 md:px-8 lg:px-16
  text-2xl md:text-4xl lg:text-5xl
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
```

### 7.4 Анимации

```typescript
// Плавное появление секций при скролле
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
  transition={{ duration: 0.6 }}
>
  {/* Контент */}
</motion.div>
```

### 7.5 Производительность

```bash
# Анализ бандла
npm run build
npx vite-bundle-visualizer
```

**Целевые метрики**:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Bundle Size: < 500KB (gzipped)

---

## 🚀 Этап 8: Деплой (1 день)

### 8.1 Подготовка к деплою

```bash
# Сборка проекта
npm run build

# Локальный превью
npm run preview
```

### 8.2 Деплой на Vercel (рекомендуется)

```bash
# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel

# Добавление переменных окружения в Vercel Dashboard
# Settings > Environment Variables
```

### 8.3 Альтернатива: Netlify

```bash
# Установка Netlify CLI
npm install -g netlify-cli

# Деплой
netlify deploy --prod
```

### 8.4 Настройка домена

1. Купите домен (например, на REG.RU, Namecheap)
2. Добавьте домен в Vercel/Netlify
3. Настройте DNS записи

---

## ✅ Чек-лист перед запуском

### Функциональность
- [ ] Все секции отображаются корректно
- [ ] Навигация работает (smooth scroll)
- [ ] Форма отправляет данные
- [ ] Галерея открывается в полном размере
- [ ] Адаптивность на всех устройствах
- [ ] Анимации работают плавно

### Контент
- [ ] Все тексты проверены на ошибки
- [ ] Изображения оптимизированы
- [ ] Контактная информация актуальна
- [ ] Цены указаны правильно
- [ ] Юридическая информация добавлена

### Техническое
- [ ] Мета-теги для SEO
- [ ] Favicon установлен
- [ ] Google Analytics подключен (опционально)
- [ ] Формы проверены на спам-защиту
- [ ] SSL сертификат активен (HTTPS)

### Маркетинг
- [ ] Pixel Facebook/VK установлен (если нужна реклама)
- [ ] Кнопки соцсетей работают
- [ ] Форма подключена к CRM (опционально)
- [ ] Настроены уведомления о новых заявках

---

## 📊 Этап 9: Аналитика и улучшения (постоянно)

### 9.1 Подключение аналитики

```bash
# Google Analytics
npm install react-ga4
```

```typescript
// src/utils/analytics.ts
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-XXXXXXXXXX');
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
```

### 9.2 Метрики для отслеживания

- Количество посетителей
- Конверсия в заявки (цель: 3-5%)
- Время на сайте
- Bounce rate (показатель отказов)
- Клики по кнопке "Забронировать"
- Просмотры фотогалереи

### 9.3 A/B тестирование

Протестируйте:
- Разные заголовки (CTA)
- Цвета кнопок
- Расположение формы
- Длину формы (короткая vs подробная)

---

## 💰 Ориентировочный бюджет

### Минимальный вариант (DIY):
- Домен: $10-15/год
- Хостинг: $0 (Vercel/Netlify бесплатно)
- Email сервис: $0 (EmailJS - бесплатный план)
- **Итого**: ~$15/год

### Расширенный вариант:
- Домен: $15/год
- Хостинг: $0-5/месяц
- Email сервис: $0-10/месяц
- CRM система: $0-30/месяц (Битрикс24, AmoCRM)
- Профессиональный фотограф: $100-300 (разово)
- **Итого**: ~$20-50/месяц

---

## ⏱️ Временные рамки

### Оптимистичный сценарий (при наличии опыта):
- Планирование: 1 день
- Разработка: 5-7 дней
- Тестирование: 1-2 дня
- Деплой: 1 день
**Итого**: 8-11 дней

### Реалистичный сценарий (для новичков):
- Обучение технологиям: 3-5 дней
- Планирование: 2 дня
- Разработка: 10-14 дней
- Тестирование: 2-3 дня
- Деплой: 1-2 дня
**Итого**: 18-26 дней (3-4 недели)

---

## 🎓 Полезные ресурсы

### Обучение:
- [React документация](https://react.dev/)
- [Tailwind CSS документация](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Figma для UI/UX](https://www.figma.com/)

### Вдохновение (дизайн):
- [Dribbble](https://dribbble.com/) - поиск "fishing tour website"
- [Awwwards](https://www.awwwards.com/)
- [Land-book](https://land-book.com/)

### Иконки и изображения:
- [Lucide Icons](https://lucide.dev/)
- [Unsplash](https://unsplash.com/) - бесплатные фото
- [Pexels](https://www.pexels.com/)

### Инструменты:
- [Coolors](https://coolors.co/) - генератор цветовых палитр
- [TinyPNG](https://tinypng.com/) - сжатие изображений
- [Google Fonts](https://fonts.google.com/)

---

## 🚀 Следующие шаги

### Немедленно (сегодня):
1. ✅ Определите целевую аудиторию и УТП
2. ✅ Соберите контент (тексты, фото)
3. ✅ Выберите технологический стек
4. ✅ Создайте базовый макет на бумаге/Figma

### На этой неделе:
1. Настройте проект (Vite + React + TypeScript)
2. Реализуйте Hero Section и навигацию
3. Добавьте информационные секции
4. Начните работу над формой

### В течение месяца:
1. Завершите разработку всех секций
2. Добавьте фотогалерею
3. Протестируйте на разных устройствах
4. Задеплойте на Vercel/Netlify

---

## 💡 Советы для успеха

1. **Начните с MVP**: Сначала сделайте простую версию, потом улучшайте
2. **Mobile-first**: Проектируйте сначала для мобильных устройств
3. **Качество контента**: Хорошие фото и тексты важнее сложных анимаций
4. **Тестируйте рано**: Показывайте друзьям и получайте обратную связь
5. **Итерируйте**: Запустите быстро, потом улучшайте на основе данных
6. **Фокус на конверсии**: Форма должна быть простой и заметной
7. **Загрузка**: Оптимизируйте изображения - скорость критична

---

**Удачи в разработке! 🎣**

Если нужна помощь на любом этапе - обращайтесь!
