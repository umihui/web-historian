var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httphelper = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    fs.readFile('/Users/student/code/hrsf82-web-historian/web/public/index.html', 'utf8',
      function(err, data) {
      res.writeHead(200, httphelper.headers);
      res.end(data);
      }
    );
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
          console.log('isUrlInList: true', input, result);
          fs.readFile('/Users/student/code/hrsf82-web-historian/web/public/loading.html', 'utf8',
            function(err, data) {
              res.writeHead(200, httphelper.headers);
              res.end(data);
            });
        } else {
          console.log('isUrlInList: false', input, result);
          archive.isUrlArchived(input, function(result) {

            if (result) {
              console.log('isUrlArchived: true', input, result);
              res.writeHead(302, httphelper.headers);
              res.end('');
              // archive.addUrlToList(input, function() {

              // });
            } else {
              console.log('isUrlArchived: false', input, result);
              archive.addUrlToList(input, function() {
                res.writeHead(302, httphelper.headers);
                res.end('');
              });
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
