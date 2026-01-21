FROM node:20-alpine

WORKDIR /app

# Copier package.json d'abord
COPY package*.json ./

# Installer les dépendances de production
RUN npm install --only=production

# Copier le reste du code
COPY . .

# Exposer le port
EXPOSE 3000

# Commande de production
CMD ["npm", "start"]
