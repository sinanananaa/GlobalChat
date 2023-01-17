FROM node:19
WORKDIR /app/server
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 8000
CMD ["yarn", "start"]