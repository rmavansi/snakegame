const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/',function(request, response){
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);

console.log('Running at Port 3000');
