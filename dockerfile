# Указываем базовый образ
FROM node:20 as build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --verbose

# Копируем все файлы в рабочую директорию
COPY . .

# Собираем приложение
RUN npm run build

# Используем Nginx для сервировки статических файлов
FROM nginx:alpine

# Копируем скомпилированные файлы из предыдущего шага
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем пользовательский конфиг Nginx, если необходимо
# COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
