'use strict';

var stackTrace = require('stack-trace');

var ReportBuilder = function(error, req) {
  this.error = error;

  if (req) {
    this.req = req;
    this.app = req.app;
  }

  this.payload = { type: 'node' };

  this.addErrorInfo().
       addEnvironmentInfo();
};

ReportBuilder.prototype.addErrorInfo = function() {
  var trace = stackTrace.parse(this.error)[0];

  this.payload['message']       = this.error.message;
  this.payload['stacktrace']    = this.error.stack;
  this.payload['file_name']     = trace.fileName;
  this.payload['line_number']   = trace.lineNumber;
  this.payload['column_number'] = trace.columnNumber;

  return this;
};

ReportBuilder.prototype.addEnvironmentInfo = function() {
  if (this.app) {
    this.payload['environment'] = this.app.get('env')
  }

  return this;
};

ReportBuilder.prototype.toJson = function() {
  return JSON.stringify({ error: this.payload });
};

var init = function(error, req) {
  return new ReportBuilder(error, req)
};

module.exports = init;
