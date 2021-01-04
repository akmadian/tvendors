const express = require('express');
 
const app = express();

app.use(express.static('dist/index.html'))
 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});