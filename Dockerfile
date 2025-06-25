# Use Node.js 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend code
COPY backend/ .

# Install dependencies
RUN npm install

# Tell Docker this app will use a dynamic port
EXPOSE 3000

# Start using the dynamically assigned port
CMD [ "node", "app.js" ]
