# Курсовое задание по фронтенду

## Описание

Необходимо написать фронтенд для мессенджера.

Результат предоставить в виде pull request в этот репозиторй.

## Критерии приёмки

Для получения высшего балла должен быть реализован следующий функционал:

1. Регистрация и вход
2. Поиск другого пользователя по имени
3. Чат с другим пользователем
4. Публичный чат со всеми пользователями
5. Список всех своих чатов

Нефункциональные требования:
1. Приём сообщений должен быть реализован через WebSocket
2. Корректное использование семантических HTML тегов
3. Какое-то подобие дизайна


## Мотивация

Первые 5 студентов, выполнивших все функциональные и нефункциональные требования, получают высший балл автоматически, без явки на зачёт.

## REST API

http://messenger.westeurope.cloudapp.azure.com/swagger

## Аутентификация
Результатом вызова методов signup и signin является объект с полем token. 
Подробнее об этих токенах: https://jwt.io/

При вызове всех остальных методов нужно подставлять полученный токен в заголовки запроса:
```
Authorization: Bearer eyJhbGciOiJ
```

## Приём сообщений (push-уведомления)

WebSocket:
ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token={token}

Токен для аутентификации передаётся в queryString.

## Библиотеки

### Построение интерфейса

React (обязательно): https://reactjs.org/

### Сборка фронтенда
Можно выбрать любой:
* Parcel: https://parceljs.org/
* Webpack: https://webpack.js.org/
* create-react-app: https://github.com/facebook/create-react-app/

### Другие

По согласованию с преподавателем.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
