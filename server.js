var http = require('http');
var fs = require('fs');
var url = require('url');

function ClassOrder(name, cost) {
  this.name = name;
  this.cost = cost;
  this.parts = [];
  this.summfunc = '\
    var summ=0; \
    obj.parts.forEach(function(part) { \
      summ += part.summ(); \
    }); \
    return summ + obj.cost;';
}

ClassOrder.prototype.summ = function() {
  return (new Function('obj', this.summfunc))(this);
};

var myobject = new ClassOrder('my object', 10);
myobject.parts[0] = new ClassOrder('my first part', 20);
myobject.parts[1] = new ClassOrder('my second part', 30);
myobject.parts[1].parts[0] = new ClassOrder('my first in second part', 40);

console.log(myobject);
console.log(myobject.summ());

http.createServer(function(req, res) {
  switch(req.url) {
    case '/':
      sendFile("index.html", res);
      break;
    case '/getobject':
      res.end(JSON.stringify(myobject));
      break;
    default:
      res.statusCode = 404;
      res.end("Page not found!");
  }
}).listen(80);

function sendFile(fileName, res) {
  var fileStream = fs.createReadStream(fileName);
  fileStream
    .on('error', function () {
      res.statusCode = 500;
      res.end("Server error");
    })
    .pipe(res)
    .on('close', function () {
      fileStream.destroy();
    });
}