# Use Node.js 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend contents
COPY backend/ .

# Install dependencies
RUN npm install

# Railway injects the PORT variable — do NOT hardcode
EXPOSE 3000

CMD ["npm", "start"]
