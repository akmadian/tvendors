ssh root@178.128.77.94

cd tvendors
git pull
cd client
sudo npm run build

pm2 stop all
pm2 start --name "site_server" server.js

exit

ssh root@ 138.68.15.116

cd tvendors
git pull
cd api
pm2 start --name "api_server" npm -- start