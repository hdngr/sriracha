'use strict';
var url = require('url'),
  qs = require('querystring');

// Thanks Madhusudhan Srinivasa
// http://madhums.me/2012/08/20/pagination-using-mongoose-express-and-jade/

module.exports = function(req, res) {
  return function(pages, page) {
    var params = qs.parse(url.parse(req.url).query),
      str = ''

    params.page = 0
    var clas = page == 0 ? "active" : "no"
    str += '<li class="' + clas + '"><a href="?' + qs.stringify(params) + '">First</a></li>'
    for (var p = 1; p < pages; p++) {
      params.page = p
      clas = page == p ? "active" : "no"
      str += '<li class="' + clas + '"><a href="?' + qs.stringify(params) + '">' + p + '</a></li>'
    }
    params.page = --p
    clas = page == params.page ? "active" : "no"
    str += '<li class="' + clas + '"><a href="?' + qs.stringify(params) + '">Last</a></li>'

    return str
  };
};