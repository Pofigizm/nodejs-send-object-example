var http = require('http');
var fs = require('fs');
var url = require('url');
var Order = require('./order')

var myobject = new Order({name:'my object', cost: 10});
myobject.parts[0] = new Order({name:'my first part', cost: 20});
myobject.parts[1] = new Order({name:'my second part', cost: 30});
myobject.parts[1].parts[0] = new Order({name:'my first in second part', cost: 40});

console.log(myobject);
console.log(myobject.summ());

http.createServer(function(req, res) {
  switch(req.url) {
    case '/':
      sendFile('index.html', res);
      break;
    case '/order.js':
      sendFile('order.js', res);
      break;
    case '/getobject':
      res.end(JSON.stringify(myobject));
      break;
    default:
      res.statusCode = 404;
      res.end('Page not found!');
  }
}).listen(80);

function sendFile(fileName, res) {
  var fileStream = fs.createReadStream(fileName);
  fileStream
    .on('error', function () {
      res.statusCode = 500;
      res.end('Server error');
    })
    .pipe(res)
    .on('close', function () {
      fileStream.destroy();
    });
}