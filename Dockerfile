# Use the official Node.js 20 image as the base image
FROM node:20

# Install netcat
RUN #apt-get update && apt-get install -y netcat

# Set the working directory in the container
WORKDIR /app

# Copy package.json,package-lock.json, and .env to the working directory
COPY package.json package-lock.json .env ./

# Install the dependencies using Yarn
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

COPY /src/data/ /app/src/data/
COPY /src/data/ /app/dist/data/

# Build the TypeScript code using Yarn
RUN npm run build

# Set executable permissions for entrypoint.sh
RUN chmod +x entrypoint.sh

# Expose the port on which the microservice will run (replace 3000 with your actual port)
EXPOSE 3000

# Start the microservice using Yarn
#CMD ["npm", "run","start"]
ENTRYPOINT ["./entrypoint.sh"]

