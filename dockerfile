## BUILD STAGE

FROM node:16 as build

WORKDIR /usr/src/app

COPY package.json yarn.lock vite.config.ts tsconfig.json ./
COPY . .

RUN yarn install
RUN yarn build:production

## UP NGINX STAGE
FROM nginx:1.19-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/prod_nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
