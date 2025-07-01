FROM n8nio/n8n

USER root
COPY .n8n /home/node/.n8n
RUN chown -R node:node /home/node/.n8n
USER node
