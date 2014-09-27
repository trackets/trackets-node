'use strict';

var stackTrace = require('stack-trace');

var ReportBuilder = function(error) {
  this.error = error;

  this.payload = { type: 'node' };

  this.addErrorInfo();
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

ReportBuilder.prototype.toJson = function() {
  return JSON.stringify({ error: this.payload });
};

var init = function(error) {
  return new ReportBuilder(error)
};

module.exports = init;
