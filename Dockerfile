FROM node:20-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar package.json e instalar dependencias
COPY package.json .
RUN npm install --production

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
