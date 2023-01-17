FROM node:19
WORKDIR /app/client
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]