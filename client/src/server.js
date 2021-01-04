const express = require('express')
const app = new express();

app.get('/', function(request, response) {
    console.log(__dirname)
    response.sendFile(__dirname + '/../dist/index.html')
})

app.listen(1234, () => console.log('Listening on 1234'))