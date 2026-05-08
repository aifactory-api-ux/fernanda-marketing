#!/bin/bash

set -e

echo "=== Fernanda Marketing - Starting Services ==="

if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Error: docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

echo "Building Docker images..."
docker-compose build

echo "Starting services..."
docker-compose up -d

echo "Waiting for services to be healthy..."
sleep 10

echo ""
echo "=== Services Status ==="
docker-compose ps

echo ""
echo "=== Access URLs ==="
echo "Frontend:    http://localhost:3000"
echo "Auth Service: http://localhost:8001"
echo "Opportunity Service: http://localhost:8002"
echo ""
echo "Health checks:"
echo "Auth Service: http://localhost:8001/health"
echo "Opportunity Service: http://localhost:8002/health"
echo ""
echo "To stop services: docker-compose down"
echo "To view logs: docker-compose logs -f"