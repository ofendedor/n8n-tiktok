FROM n8nio/n8n

USER root

# Copia toda la carpeta .n8n incluyendo custom con el nodo TikTok
COPY .n8n /home/node/.n8n

# Cambia a la carpeta del nodo TikTok
WORKDIR /home/node/.n8n/custom/n8n-nodes-tiktok

# Instala pnpm globalmente
RUN npm install -g pnpm

# Instala dependencias y compila el nodo TikTok
RUN pnpm install
RUN pnpm build

# Da permisos a todo .n8n para el usuario node
RUN chown -R node:node /home/node/.n8n

USER node

# Cambia el directorio de trabajo de vuelta a /home/node/.n8n (opcional)
WORKDIR /home/node/.n8n
