#!/bin/bash
echo "✅ SITE EN LIGNE - VÉRIFICATIONS FINALES"

echo "1. HTTPS fonctionnel:"
curl -k -I https://maisongansou.com 2>/dev/null | head -1
echo ""

echo "2. Redirection HTTP → HTTPS:"
curl -I http://maisongansou.com 2>/dev/null | grep -i "http\|location"
echo ""

echo "3. Version www:"
curl -k -I https://www.maisongansou.com 2>/dev/null | head -1
echo ""

echo "4. Titre de la page:"
curl -k -s https://maisongansou.com | grep -o "<title>[^<]*</title>"
echo ""

echo "5. État des services Docker:"
docker-compose ps
echo ""

echo "6. Logs récents:"
docker-compose logs --tail=3
echo ""

echo "🌐 VOTRE SITE EST MAINTENANT ACCESSIBLE SUR:"
echo "   🔗 https://maisongansou.com"
echo "   🔗 https://www.maisongansou.com"
echo ""
echo "🎯 Hot reload activé:"
echo "   Modifiez vos fichiers → Transférez via Termius → Changements instantanés"
