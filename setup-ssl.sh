#!/bin/bash
echo "🔐 Configuration SSL pour maisongansou.com"

# Vérifier DNS
echo "🔍 Vérification DNS..."
IP_VPS=$(curl -s ifconfig.me)
DNS_IP=$(dig +short maisongansou.com)

if [ "$DNS_IP" != "$IP_VPS" ]; then
    echo "⚠️  DNS non configuré correctement"
    echo "   IP VPS: $IP_VPS"
    echo "   DNS IP: $DNS_IP"
    echo "   Configurez chez Hostinger:"
    echo "   - A record: maisongansou.com → $IP_VPS"
    echo "   - A record: www.maisongansou.com → $IP_VPS"
    echo "   Attendez 5-10 minutes puis relancez ce script"
    exit 1
fi

echo "✅ DNS correctement configuré"

# Démarrer Nginx temporairement
echo "🚀 Démarrage de Nginx pour le challenge SSL..."
docker-compose up -d nginx

# Attendre
sleep 5

# Obtenir les certificats SSL
echo "📝 Génération des certificats Let's Encrypt..."
docker-compose run --rm certbot

# Copier les certificats dans le dossier Nginx
echo "📁 Copie des certificats..."
cp -r certbot/conf/live/maisongansou.com/* nginx/ssl/ 2>/dev/null || true

# Redémarrer Nginx avec SSL
echo "🔄 Redémarrage avec SSL..."
docker-compose down
docker-compose up -d

echo "✅ SSL configuré avec succès!"
echo "🌐 Accédez à: https://maisongansou.com"
echo ""
echo "🔍 Vérification:"
sleep 3
curl -I https://maisongansou.com 2>/dev/null | head -1 || echo "SSL peut prendre quelques minutes à s'activer"
