# Use Node.js 18 image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only backend folder contents
COPY backend/ .

# Install dependencies
RUN npm install

# Expose app port (e.g. 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
