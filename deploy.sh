#!/bin/bash
# Déploiement Frontend Seul

set -e

echo "🚀 Déploiement Frontend Maison Gansou"
echo "======================================"

# 1. Vérifier les fichiers
echo "📋 Vérification des fichiers..."
if [ ! -f "frontend/package.json" ]; then
    echo "❌ package.json manquant dans frontend/"
    exit 1
fi

# 2. Construire l'image
echo "🔨 Construction de l'image Docker..."
docker-compose build frontend

# 3. Démarrer les services
echo "🚀 Démarrage des services..."
docker-compose up -d

# 4. Attendre le démarrage
echo "⏳ Attente du démarrage..."
sleep 5

# 5. Vérifier l'état
echo "📊 État des containers..."
docker-compose ps

# 6. Vérifier les logs
echo "📝 Logs du frontend..."
docker-compose logs frontend --tail=10

# 7. Vérifier l'accès
echo "🌐 Test d'accès..."
if curl -f http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Frontend accessible sur port 5173"
else
    echo "⚠️  Frontend non accessible, vérifiez les logs"
fi

echo ""
echo "✅ Déploiement initial terminé!"
echo "🌐 Frontend (direct): http://localhost:5173"
echo "🌍 Frontend (via Nginx): http://localhost"
echo ""
echo "⚠️  IMPORTANT: Les DNS doivent pointer vers cette machine"
echo "   Configurez chez Hostinger:"
echo "   - A record: maisongansou.com → $(curl -s ifconfig.me)"
echo "   - A record: www.maisongansou.com → $(curl -s ifconfig.me)"
echo ""
echo "📋 Commandes utiles:"
echo "   docker-compose logs -f frontend  # Voir les logs"
echo "   ./update-frontend.sh             # Mettre à jour le code"
echo "   ./setup-ssl.sh                   # Configurer SSL (après DNS)"
