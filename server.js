const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname + '/public'));

router.get('/',function(request, response){
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router);
app.listen(3000);

console.log('Running at Port 3000');
