# Estágio de construção (builder)
FROM node:23-slim AS builder

WORKDIR /app

# Copia os arquivos de dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências exatas do package-lock.json (recomendado para produção)
RUN npm ci --omit=dev

# Copia o restante do código-fonte
COPY . .

# (Opcional) Se você usa TypeScript ou precisa de um passo de build
RUN npm run build

# Remove dependências desnecessárias (ajuste conforme necessário)
RUN npm prune --production

# --- Estágio de produção final ---
FROM node:23-slim

WORKDIR /app

# Copia apenas o necessário do estágio builder
COPY --chown=nodejs:nodejs --from=builder /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs --from=builder /app/package*.json ./
COPY --chown=nodejs:nodejs --from=builder /app/dist ./dist
# OU para código JS puro:
# COPY --chown=nodejs:nodejs --from=builder /app/src ./src

# Comando de inicialização
CMD ["npm", "start"]