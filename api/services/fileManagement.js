var normalize = require('normalize-path');
var mkDirP = require('mkdirp');
const appConfig = require('../../config/appconfig');
const fs = require("fs")

module.exports = {

  createDirectory: function (dir,callback) {
    mkDirP(normalize(dir), function (err,path) {
      if(err){
        callback(err);
      }
      else {
        callback(null,path);
      }
    });
  },
  uploadFile: (uploadPath, fileName, req) => {
    var response = {};
    var filePath = 'uploads/';
    return new Promise((resolve, reject) => {
      module.exports.createDirectory(filePath, function (err, data) {
            req.file(fileName).upload({ dirname: uploadPath }, function (err, files) {
                if (!err && files && files.length > 0) {
                    var fileName = files[0].filename;
                    var filePath = uploadPath + '' + fileName;
                    fs.rename(files[0].fd, filePath, function (err) {
                    if (!err) {
                        response.statusCode = appConfig.HTTpResponseCode.OK;
                        response.message = "user profile information has been edited";
                        response.filename = fileName;
                        resolve(response);
                    }else {
                        response.statusCode = appConfig.HTTpResponseCode.InternalError;
                        response.message = appConfig.HTTpResponseCode.InternalError;
                        response.filename = null;
                        reject(response);
                    }
                    });
                } else if (files.length == 0) {
                response.statusCode = appConfig.HTTpResponseCode.BadRequest;
                response.message = 'no file to upload';
                response.filename = null;
                resolve(response);
                }
            });
        });
    });

  }
}