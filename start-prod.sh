#!/bin/bash

echo "🚀 Starting production environment..."

# Stop development containers if running
docker-compose -f docker-compose.dev.yml down 2>/dev/null

# Start production containers
docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml up --build -d

echo "✅ Production environment started!"
echo "🌐 Access your app at: https://maisongansou.com"
echo ""
echo "📋 Logs: docker-compose logs -f"
echo "🛑 Stop: docker-compose down"
