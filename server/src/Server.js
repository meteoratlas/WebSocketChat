const app = require('express')();
const http = require('http').createServer(app);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3001, function(){
  console.log('Running on port 3001');
});