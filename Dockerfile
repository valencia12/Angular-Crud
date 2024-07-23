# Use the official Node.js 16 image as the base image
FROM node:16 as build-step

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) to the working directory
COPY package*.json /app/

# Install all the dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Run Jasmine tests
#TO DO: review this line
#RUN npm run test -- --watch=false --no-progress --browsers=EdgeHeadlessNoSandbox 

# Build the Angular app in production mode
RUN npm run build -- --outputPath=./dist/out

# Use the official Nginx image to serve the app
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build-step /app/dist/out/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]