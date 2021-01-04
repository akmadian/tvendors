# Build and deploy client
cd client
npm i
npm run build
sudo -u nodejs pm2 start server

cd ..
cd reviews_api
npm i
sudo -u nodejs pm2 start