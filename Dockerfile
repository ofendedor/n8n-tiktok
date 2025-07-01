FROM n8nio/n8n

USER root

# Copia tus nodos personalizados (si existen localmente en .n8n)
COPY .n8n /home/node/.n8n

# Instala el nodo TikTok globalmente para que esté disponible en tiempo de ejecución
RUN npm install --location=global @igabm/n8n-nodes-tiktok

# Asegura permisos correctos
RUN chown -R node:node /home/node/.n8n

USER node
