# Node.js ka ready-made environment use karenge
FROM node:18-alpine

# Docker ke andar ek folder banayenge
WORKDIR /app

# Apne project ke package.json aur package-lock.json ko copy karenge
COPY package*.json ./

# Dependencies install karenge
RUN npm install

# Ab poora project ke files copy karenge
COPY . .

# Production ke liye app build karenge
RUN npm run build

# Ek light server install karenge jo build output ko serve karega
RUN npm install -g serve

# Container ke bahar ke world se port kholenge
EXPOSE 3000

# Final command: app ko serve karenge
CMD ["serve", "-s", "dist", "-l", "3000"]