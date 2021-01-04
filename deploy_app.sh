ssh root@178.128.77.94

cd tvendors
git pull
cd client
sudo npm run build

pm2 stop all
pm2 start server.js