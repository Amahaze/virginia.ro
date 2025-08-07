# Stop any existing PM2 processes
pm2 stop all

# Install production dependencies
npm install --production

# Build the application
npm run build

# Copy environment variables
Copy-Item .env.production .env

# Start the server with PM2
pm2 start "npm run start" --name "vergina.ro"

# Display PM2 status
pm2 status