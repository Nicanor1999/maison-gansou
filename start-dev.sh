#!/bin/bash

echo "🚀 Starting development environment with hot-reload..."

# Stop production containers if running
docker-compose -f docker-compose.yml down 2>/dev/null

# Start development containers
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build -d

echo "✅ Development environment started!"
echo "🌐 Access your app at: https://maisongansou.com"
echo "🔥 Hot-reload is enabled"
echo ""
echo "📋 Logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "🛑 Stop: docker-compose -f docker-compose.dev.yml down"
