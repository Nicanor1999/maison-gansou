#!/bin/bash
echo "🔐 Installation Let's Encrypt (SSL gratuit et reconnu)"

# Arrêter Nginx temporairement
docker-compose stop nginx

# Installer Certbot
sudo apt update
sudo apt install -y certbot

# Libérer le port 80
sudo fuser -k 80/tcp 2>/dev/null || true

# Obtenir les certificats (mode standalone)
sudo certbot certonly --standalone \
  -d maisongansou.com \
  -d www.maisongansou.com \
  --email contacts@maisongansou.com \  
  --agree-tos \
  --non-interactive \
  --force-renewal

if [ $? -eq 0 ]; then
    echo "✅ Certificats obtenus!"
    
    # Copier les certificats
    sudo cp /etc/letsencrypt/live/maisongansou.com/fullchain.pem nginx/ssl/
    sudo cp /etc/letsencrypt/live/maisongansou.com/privkey.pem nginx/ssl/
    
    # Redémarrer
    docker-compose start nginx
    
    echo "🔄 Redémarrage effectué!"
    echo "🌐 Votre site a maintenant un SSL reconnu!"
    echo "🔗 Testez: https://maisongansou.com"
else
    echo "❌ Échec. Vérifiez:"
    echo "   1. Le domaine pointe bien vers 185.170.214.139"
    echo "   2. Le port 80 est ouvert"
    echo "   3. L'email est valide"
fi
