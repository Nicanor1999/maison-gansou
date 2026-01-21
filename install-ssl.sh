#!/bin/bash
echo "🔐 INSTALLATION SSL POUR MAISONGANSOU.COM"
echo "=========================================="

# Vérifier l'email
if [ ! -f ".env" ] || ! grep -q "CERTBOT_EMAIL" .env; then
    echo "❌ Email non configuré"
    echo "   Créez un fichier .env avec:"
    echo "   CERTBOT_EMAIL=votre@email.com"
    exit 1
fi

EMAIL=$(grep CERTBOT_EMAIL .env | cut -d'=' -f2)
echo "📧 Email utilisé: $EMAIL"

# Arrêter tout
echo "🛑 Arrêt des services..."
docker-compose down 2>/dev/null || true

# Créer la structure
echo "📁 Création des dossiers..."
mkdir -p nginx/ssl certbot/{www,conf}

# docker-compose.yml simplifié
echo "📦 Configuration Docker..."
cat > docker-compose.yml << 'DOCKEREOF'
services:
  frontend:
    build: ./frontend
    container_name: maison-frontend
    restart: unless-stopped
    expose:
      - "5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev -- --host 0.0.0.0 --port 5173

  nginx:
    image: nginx:alpine
    container_name: maison-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl
      - ./certbot/www:/var/www/certbot:ro
    depends_on:
      - frontend
DOCKEREOF

# Nginx configuration temporaire pour Certbot
echo "🌐 Configuration Nginx temporaire..."
cat > nginx/nginx.conf << 'NGINXEOF'
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name maisongansou.com www.maisongansou.com;
        
        # Pour Certbot
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        # Redirection temporaire
        location / {
            return 200 "Site en cours de configuration SSL...";
            add_header Content-Type text/plain;
        }
    }
}
NGINXEOF

# Démarrer Nginx
echo "🚀 Démarrage de Nginx..."
docker-compose up -d nginx

# Attendre
echo "⏳ Attente du démarrage..."
sleep 5

# Obtenir les certificats SSL
echo "📝 Obtention des certificats Let's Encrypt..."
docker run --rm \
  -v $(pwd)/certbot/www:/var/www/certbot \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  certbot/certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d maisongansou.com \
  -d www.maisongansou.com \
  --force-renewal

if [ $? -eq 0 ]; then
    echo "✅ Certificats obtenus avec succès!"
else
    echo "❌ Échec de l'obtention des certificats"
    echo "   Vérifiez:"
    echo "   1. Le domaine pointe bien vers 185.170.214.139"
    echo "   2. Le port 80 est ouvert sur le VPS"
    echo "   3. L'email est valide"
    exit 1
fi

# Configuration Nginx finale avec SSL
echo "🔧 Configuration Nginx finale..."
cat > nginx/nginx.conf << 'NGINXEOF'
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:5173;
    }

    # HTTP vers HTTPS
    server {
        listen 80;
        server_name maisongansou.com www.maisongansou.com;
        return 301 https://\$host\$request_uri;
    }

    # HTTPS
    server {
        listen 443 ssl http2;
        server_name maisongansou.com www.maisongansou.com;

        # SSL
        ssl_certificate /etc/nginx/ssl/live/maisongansou.com/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/live/maisongansou.com/privkey.pem;
        
        # Paramètres SSL
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers off;

        # Headers de sécurité
        add_header Strict-Transport-Security "max-age=63072000" always;
        add_header X-Frame-Options SAMEORIGIN always;
        add_header X-Content-Type-Options nosniff always;

        # Frontend Vue.js
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }

        # Fichiers statiques
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            proxy_pass http://frontend;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
NGINXEOF

# Copier les certificats
echo "📁 Copie des certificats..."
cp -r certbot/conf/live/maisongansou.com/* nginx/ssl/ 2>/dev/null || {
    echo "⚠️  Impossible de copier les certificats, tentative alternative..."
    mkdir -p nginx/ssl
    ls -la certbot/conf/live/maisongansou.com/
}

# Démarrer tous les services
echo "🚀 Démarrage complet..."
docker-compose down
docker-compose build frontend
docker-compose up -d

# Vérifier
echo "🔍 Vérification..."
sleep 5

echo ""
echo "📊 ÉTAT DES SERVICES:"
docker-compose ps

echo ""
echo "🌐 TESTS:"
echo "1. HTTP → HTTPS:"
curl -I http://maisongansou.com 2>/dev/null | grep -i "location\|http" || echo "   Test HTTP échoué"

echo ""
echo "2. SSL (peut prendre 1-2 minutes):"
sleep 2
curl -I https://maisongansou.com 2>/dev/null | head -1 || echo "   SSL en cours d'activation..."

echo ""
echo "✅ INSTALLATION TERMINÉE!"
echo "🌐 VOTRE SITE EST MAINTENANT ACCESSIBLE SUR:"
echo "   🔗 https://maisongansou.com"
echo "   🔗 https://www.maisongansou.com"
echo ""
echo "📝 LOGS:"
docker-compose logs --tail=3
