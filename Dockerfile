FROM n8nio/n8n

USER root

# Copia los nodos personalizados al contenedor
COPY .n8n /home/node/.n8n

# Ajusta los permisos de los archivos
RUN chown -R node:node /home/node/.n8n

USER node
