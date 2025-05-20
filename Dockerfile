FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY client/package.json client/package-lock.json ./client/
RUN npm install \
  && npm install --prefix client

COPY . .
RUN npm run build --prefix client

RUN npm prune --production

ENV MONGO_URI=""  
ENV JWT_SECRET=""

ENV NODE_ENV=production  
EXPOSE 8080

CMD ["npm","start"]
