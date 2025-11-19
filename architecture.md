# Структура проекта

## Обзор
Проект будет реализован с двумя основными проектами:
### social-app - основное приложение
### ui-library - библиотека переиспользуемых компонентов

## Структура social-app
social-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/ 
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── NewsFeed/
│   │   ├── CreatePostModal/
│   │   └── AuthForm/   
│   ├── pages/         
│   │   ├── AuthPage/
│   │   └── HomePage/
│   ├── utils/
│   ├── App.css  
│   ├── App.test.tsx
│   ├── App.tsx  
│   ├── index.css        
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── jest.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.app.json
└── vite.config.js

## Структура ui-library
ui-library/
├── src/
│   ├── Button/
│   ├── TextArea/
│   ├── Input/
│   ├── NewsCard/
│   └── index.ts      
├── package.json
├── eslint.config.js
├── jest.config.js
├── tsconfig.json
├── vite.config.js
└── .gitignore

## Используемые бибилиотеки
### Runtime зависимости:
- "react": "^19.2.0" - UI библиотека
- "react-dom": "^19.2.0" - рендеринг
- "react-router-dom: ^6.0.0" - маршрутизация
- "@my-app/ui-library" - локальные ui компоненты
- "@mui/material" - UI библиотека (material-ui)

### Dev зависимости:
- typescript ~5.9.3 - Статическая типизация
- vite ^7.1.11 - Сборщик и dev-сервер
- eslint ^9.36.0 - Линтинг кода
- jest ^30.2.0 - Тестирование

### Компоненты
Button - Базовая кнопка с вариантами стилей
Input - однострочное поле ввода
Textarea - многострочное поле для текста
NewsCard - новостная карточка

Header - верхняя панель
Sidebar - боковая панель
NewsFeed - лента новостей
CreatePostModal - окно создания поста
AuthForm - форма авторизации

## Структура роутинга и отображаемых страниц
Главная страница (`/`) - лента новостей с постами
Страница авторизации (`/auth`) - вход и регистрация
