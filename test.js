var http = require('http'),
    path = require('path'),
    os = require('os'),
    fs = require('fs');
 
var Busboy = require('busboy');
 
http.createServer(function(req, res) {
  if (req.method === 'POST') {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('fieldname : ' + fieldname);
      console.log("filename : " + filename);
      var saveTo = path.join('files/', path.basename(filename));
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);
  }
  res.writeHead(404);
  res.end();
}).listen(8000, function() {
  console.log('Listening for requests');
});