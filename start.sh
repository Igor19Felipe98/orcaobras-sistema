
#!/bin/bash

echo "🏗️  Iniciando OrçaObras..."

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Configurar banco de dados
echo "🗄️  Configurando banco de dados..."
npx prisma generate
npx prisma db push

# Executar setup inicial
echo "⚙️  Executando setup inicial..."
npx tsx scripts/setup-codespaces.ts

# Iniciar aplicação
echo "🚀 Iniciando aplicação em http://localhost:3000"
npm run dev
