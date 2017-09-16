// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var cron = require('node-cron');
//var handler = require('./request-handler');



var port = 3000;
var ip = '127.0.0.1';
var server = http.createServer();

cron.schedule('*/3 * * * * *', function(){
  console.log('running a task every minute');
  archive.readListOfUrls(archive.downloadUrls);
});


if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}



// archive.readListOfUrls(archive.downloadUrls);
// fs.writeFile('/Users/student/code/hrsf82-web-historian/archives/sites.txt','',function(err) {
//   if (err) {
//     throw err;
//   }
//   console.log('CLEAR TXT');
// }

// var file = fs.createWriteStream(archive.paths.archivedSites + '/' + 'testFile456.html');
// var request = http.get("www.amazon.com", function(response) {
//   response.pipe(file);
// });