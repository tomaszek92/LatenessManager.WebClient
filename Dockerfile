FROM node:latest AS build
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
COPY . .
RUN npm run build

FROM nginx:latest
ADD nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /usr/src/app/dist/lateness-manager-web-client /usr/share/nginx/html