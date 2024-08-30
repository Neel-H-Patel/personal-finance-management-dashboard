# Use the official Node.js image as a parent image
FROM node:20-alpine as build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the Angular app
RUN npm run build --configuration finance-dashboard

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/finance-dashboard /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
