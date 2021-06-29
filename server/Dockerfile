FROM node:12.16.1
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY wait-for-it.sh .
RUN chmod +x /app/wait-for-it.sh

COPY . .

EXPOSE 8080

CMD ["/app/wait-for-it.sh", "db:27017", "-t", "30", "--", "npm", "run", "start_dev"]

