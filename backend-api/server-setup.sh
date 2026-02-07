#!/bin/bash

# DevoCare Backend Setup Script for DigitalOcean
# Usage: curl -sL https://raw.githubusercontent.com/your-repo/server-setup.sh | bash

echo "Starting DevoCare Server Setup..."

# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PM2 globally
sudo npm install -g pm2

# 4. Create directory and set permissions
mkdir -p ~/devocare-backend
cd ~/devocare-backend

# 5. Instructions for the user
echo "------------------------------------------------"
echo "Setup Complete!"
echo "Next Steps:"
echo "1. Clone your repo here: git clone <your-repo-url> ."
echo "2. Move to backend-api: cd backend-api"
echo "3. Install dependencies: npm install"
echo "4. Create .env: nano .env (Add MONGO_URI, JWT_SECRET, FRONTEND_URL)"
echo "5. Start with PM2: pm2 start server.js --name devocare-api"
echo "6. Save PM2 list: pm2 save && pm2 startup"
echo ""
echo "Note: Ensure Port 5000 is open in your DO Firewall!"
echo "------------------------------------------------"
