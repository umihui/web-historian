var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httphelper = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
      fs.readFile('/Users/student/code/hrsf82-web-historian/web/public/index.html', 'utf8',
        function(err, data) {
          res.writeHead(200, httphelper.headers);
          res.end(data);
        }
      );
    } else {
      fs.readFile(archive.paths.archivedSites + pathname + '/index.html', 'utf8',
        function(err, data) {
          if (err) {
            res.writeHead(404, httphelper.headers);
            res.end('not found');
          }
          res.writeHead(200, httphelper.headers);
          res.end(data);
        }
      );
    }

  }

  if (req.method === 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });


    req.on('end', function() {
      console.log(body);
      var input = body.split('=')[1];
      archive.isUrlInList(input, function(result) {
        if (result) {
          fs.readFile('/Users/student/code/hrsf82-web-historian/web/public/loading.html', 'utf8', function(err, data) {
            res.writeHead(200, httphelper.headers);
            res.end(data);
          });
        } else {
          archive.isUrlArchived(input, function(result) {
            if (result) {
              fs.readFile(archive.paths.archivedSites + '/' + input + '/index.html', 'utf8', function(err, data) {
                res.writeHead(302, httphelper.headers);
                res.end(data);
              });
            } else {

              archive.addUrlToList(input, function() {
                fs.readFile('/Users/student/code/hrsf82-web-historian/web/public/loading.html', 'utf8', function(err, data) {
                  res.writeHead(302, httphelper.headers);
                  res.end(data);
                });
              });
              //
            }
          });
        }
      });
    });
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, httphelper.headers);
    res.end('');
  }
};



