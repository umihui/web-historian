// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');



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