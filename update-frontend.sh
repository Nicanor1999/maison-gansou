#!/bin/bash
# Mise à jour rapide du frontend

echo "🔄 Mise à jour du frontend Vue.js..."

# Synchroniser les fichiers
echo "📁 Synchronisation des fichiers..."
# (Vous transférez vos fichiers via Termius SFTP)

# Redémarrer le container
echo "🔁 Redémarrage du container..."
docker-compose restart frontend

# Attendre le redémarrage
sleep 3

# Vérifier
echo "✅ Mise à jour terminée!"
echo "Les changements sont visibles sur https://maisongansou.com"
echo ""
echo "📝 Logs:"
docker-compose logs frontend --tail=5
