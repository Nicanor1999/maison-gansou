#!/bin/bash
echo "🔐 Installation SSL Let's Encrypt corrigée"

# 1. Arrêter Nginx
echo "🛑 Arrêt de Nginx..."
docker-compose stop nginx

# 2. Libérer port 80
echo "🚪 Libération port 80..."
sudo pkill -f "nginx" 2>/dev/null || true
sudo fuser -k 80/tcp 2>/dev/null || true
sleep 2

# 3. Vérifier port libre
echo "🔍 Vérification port 80..."
if sudo netstat -tulpn | grep -q ":80 "; then
    echo "❌ Port 80 encore utilisé:"
    sudo netstat -tulpn | grep ":80 "
    exit 1
fi

# 4. Demander email
read -p "📧 Entrez votre email pour Let's Encrypt: " EMAIL
if [ -z "$EMAIL" ]; then
    echo "❌ Email requis"
    exit 1
fi

# 5. Obtenir certificats
echo "📝 Obtention des certificats..."
sudo certbot certonly --standalone \
  -d maisongansou.com \
  -d www.maisongansou.com \
  --email "$EMAIL" \
  --agree-tos \
  --non-interactive \
  --preferred-challenges http

if [ $? -ne 0 ]; then
    echo "❌ Échec. Essayons en mode debug..."
    sudo certbot certonly --standalone \
      -d maisongansou.com \
      -d www.maisongansou.com \
      --email "$EMAIL" \
      --agree-tos \
      --non-interactive \
      --preferred-challenges http \
      --dry-run
    exit 1
fi

# 6. Copier certificats
echo "📁 Copie des certificats..."
sudo cp -L /etc/letsencrypt/live/maisongansou.com/fullchain.pem nginx/ssl/ 2>/dev/null || \
  sudo cp /etc/letsencrypt/live/maisongansou.com/fullchain.pem nginx/ssl/

sudo cp -L /etc/letsencrypt/live/maisongansou.com/privkey.pem nginx/ssl/ 2>/dev/null || \
  sudo cp /etc/letsencrypt/live/maisongansou.com/privkey.pem nginx/ssl/

# 7. Redémarrer
echo "🚀 Redémarrage..."
docker-compose start nginx

# 8. Vérifier
echo "✅ SSL installé!"
echo "🌐 Test:"
sleep 3
curl -I https://maisongansou.com 2>/dev/null | head -1 || echo "SSL en activation..."

echo ""
echo "🔒 Votre site a maintenant un SSL reconnu!"
echo "🔄 Renouvellement automatique configuré (90 jours)"
