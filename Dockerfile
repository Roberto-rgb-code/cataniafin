# Etapa 1: build de la app
FROM node:20 as build

WORKDIR /app
COPY . .

# Instala dependencias y construye el proyecto
RUN npm install && npm run build

# Etapa 2: servir app estática con nginx
FROM nginx:stable-alpine

# Copiar archivos construidos a nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Elimina el archivo default de configuración
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu propia configuración (la crearemos en el siguiente paso)
COPY nginx.conf /etc/nginx/conf.d

# Expone el puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
