var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http'); //remove later
var scrape = require('website-scraper');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    console.log(data);
    var result = data.split('\n');
    result.pop();
    console.log('READLIST', result);
    callback(result);
  });

};

exports.isUrlInList = function(url, callback) {
  console.log('isUrlInList paths.list:', exports.paths.list);
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    var result = data.includes(url);
    callback(result);
  });
};

exports.addUrlToList = function(url, callback) {
  console.log('addUrlToList paths.list:', exports.paths.list);
  var add = url + '\n';
  fs.appendFile(exports.paths.list, add, (err) => {
    if (err) { throw err; }
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(exports.paths.archivedSites + '/' + url, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(urls) {
  console.log('URL: ', urls);
  //input is an array of url strings
  //iterate the array
  //save each url into archive folder
  fs.writeFile('/Users/student/code/hrsf82-web-historian/archives/sites.txt', '', function(err) {
    if (err) {
      console.log('CLEAR', err);
    }
    console.log('CLEAR TXT');
  });
  urls.forEach( function(url) {
    var options = {
      urls: ['http://'+ url],
      directory: exports.paths.archivedSites + '/' + url
    };

    scrape(options).then((result) => {

      // console.log(result);
    }).catch((err) => {
      console.log('DOWNLOAD', err);
    });

  });
  //urls.forEach( function(url) {
    //   var file = fs.createWriteStream(exports.paths.archivedSites + '/' + url);

    //   var request = http.get('http://'+ url, function(response) {
    //     //console.log('RESPONSE downloadUrls:', response);
    //     response.pipe(file);
    // });



  //})
};
