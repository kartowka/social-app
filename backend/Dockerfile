FROM node:current-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
# Bundle app source
ARG GITHUB_SECRET_JWT_SECRET
ENV JWT_SECRET $GITHUB_SECRET_JWT_SECRET
ARG GITHUB_SECRET_JWT_REFRESH_TOKEN
ENV JWT_REFRESH_TOKEN $GITHUB_SECRET_JWT_REFRESH_TOKEN
ARG GITHUB_SECRET_JWT_LIFETIME
ENV JWT_LIFETIME $GITHUB_SECRET_JWT_LIFETIME
ENV MONGO_URL mongodb://mongo:27017/docker-node-mongo
ENV REDIS_URL redis://redis:6379
ENV PORT 3000
ENV NODE_ENV development

EXPOSE 3000
CMD npm run start