FROM node:18

WORKDIR /DiplomeBackup

COPY . .

WORKDIR /DiplomeBackup/frontend
RUN npm i 
RUN npm run build

WORKDIR /DiplomeBackup/backend
RUN npm i 


EXPOSE 3001

CMD ["node", "app.js"]