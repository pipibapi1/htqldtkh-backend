FROM node:16-alpine as builder
WORKDIR /app
COPY . .
RUN npm install\
&& npm run build

FROM node:16-alpine as final
WORKDIR /app

ENV PORT=8000
ENV DB_URL=mongodb://mongodb:27017
ENV DB_NAME=htqldtkh_db
ENV DB_CONNECTION_STRING=mongodb://mongodb:27017/htqldtkh_db
ENV JWT_SECRET=ht!@ql-dtkh_secret
ENV BCRYPT_SALT_ROUND=10
ENV SYSTEM_EMAIL=htqldtkh@gmail.com
ENV SYSTEM_EMAIL_APP_PASSWORD=xctmrnyubayyhpbi

COPY --from=builder ./app/dist ./dist
COPY package*.json .
RUN npm i --omit=dev

# Development
CMD ["npm", "start"]

# Production
# RUN npm install -g pm2
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]