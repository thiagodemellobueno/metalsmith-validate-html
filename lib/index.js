/*
 * metalsmith-metalsmith-validate-html
*/
'use strict';

var validator = require('html-validator'),
    fs = require('fs'),
    validatorOptions = {
      format: 'text'
    };

module.exports = function plugin( data ) {

  data = (('object' === typeof data)? data : undefined) || {};

  return function (files, metalsmith, done) {

    each(Object.keys(files), validate, done);

    function validate(filename, done) {

      fs.readFile( filename, 'utf8', function (err, html) {

        if (err) {
          throw err;
        }

        validatorOptions.data = html;

        validator(opts, function (error, data) {
          if (error) {
            throw error;
          }
          console.log(data);
        })
      })
    }
  };
};
