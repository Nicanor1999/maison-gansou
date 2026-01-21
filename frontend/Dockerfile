# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copier package.json d'abord (optimisation cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Build pour production
RUN npm run build

# Production stage
FROM nginx:alpine

# Copier les fichiers buildés vers nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copier une config nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
