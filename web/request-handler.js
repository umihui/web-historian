var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httphelper = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    fs.readFile('/Users/student/code/hrsf82-web-historian/web/public/index.html', 'utf8', function(err, data) {
    //console.log('ERROR!!!', err);
      res.writeHead(200, httphelper.headers);
      res.end(data);
    });
  }

  if (req.method === 'POST') {
    var body = '';

    req.on('data', function(data) {
      body += data;
    });
    // var input = body.split('=')[1];

    req.on('end', function() {
      var input = body.split('=')[1];
      // archive.isUrlInList(input, function(result) {
      //   if (!result) {
      archive.addUrlToList(input, function() {
        res.writeHead(302, httphelper.headers);
        res.end('');
      });
      //   }

        //url not in the list : url was Archived or because it's new url
        //if result is false: add url to sites.txt and retrun loading page
        //esle return files

      //console.log('post archive', archive.isUrlInList(input, function(result) {console.log('WE KNOW ABOUT CALLBACKS:', result)}));
    });

  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, httphelper.headers);
    res.end('');
  }

};
