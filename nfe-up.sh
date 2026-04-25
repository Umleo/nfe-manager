#!/bin/bash

set -e # faz o script parar se der erro

echo "Construindo imagem front..."
cd frontend
docker build -t meu-front .
cd ..

echo "Construindo imagem back..."
cd backend 
docker build -t minha-api .
cd ..

echo "Subindo containers..."
docker compose -f meu-compose.yml up -d #opção para subir em segundo plano

echo "Rodando!"