# ☕ tvendors

Looking for a specific tea product or products, but not sure where to get them? Use tvendors.

The vendor list is currently very short, more will be added.

Planned features include:
 - Submitting vendor reviews and ratings for others to see
 - Liking and disliking of vendor reviews
 - All kinds of searching and filtering of vendors

![Screenshot of tvendors](screenshot.png)

## Technical Stuff
tvendors is made with a Vue.js frontend, and a MongoDB/ GraphQL backend. Both the frontend and backend are hosted on Digital Ocean Droplets.

### How to run this locally
``` bash
$ npm i

# Start graphql
$ cd api
$ npm i
$ node src/index.js
$ cd ..

# Start frontend
$ cd client
$ npm i
$ npm run dev
```