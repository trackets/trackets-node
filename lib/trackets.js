'use strict';

var http = require('http');
var stackTrace = require('stack-trace');

var Trackets = function(apiKey) {
  this.apiKey = apiKey;
  this.hostname = 'trackets.com';
  this.port = 443;
};

Trackets.prototype.notify = function(error) {
  var trace = stackTrace.parse(error)[0];

  var payload = {
    error: {
      type: 'node',
      message: error.message,
      file_name: trace.fileName,
      line_number: trace.lineNumber,
      column_number: trace.columnNumber,
      stacktrace: error.stack
    }
  };

  var errorString = JSON.stringify(payload);

  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': errorString.length
  };

  var options = {
    hostname: this.hostname,
    port: this.port,
    path: '/reports/' + this.apiKey,
    method: 'POST',
    headers: headers
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');
  });

  req.write(errorString);
  req.end();
};

Trackets.prototype.expressHandler = function() {
  var self = this;

  return function errorHandler(error, req, res, next) {
    self.notify(error);

    next(error);
  };
};

var init = function(apiKey) {
  return new Trackets(apiKey)
};

module.exports = init;
