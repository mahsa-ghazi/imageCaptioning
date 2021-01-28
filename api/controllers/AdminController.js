const mainDb = require('../services/db');
const adminMdl = mainDb.getModel('ImageCaptioningAdmin', 'Admin', 'Admin');
const bcrypt = require('bcrypt');
const emailaddresses = require('machinepack-emailaddresses');
const Passwords = require('machinepack-passwords');


require('dotenv').config()

module.exports = {
  
    register:  (req, res) => {
        try {
            if (_.isUndefined(req.param('email'))) {
                return res.json(400, {error: 'email address is mandatory!'});
              }if (_.isUndefined(req.param('password'))) {
                return res.json(400, {error: 'password is mandatory!'});
              }if (req.param('password').length < 2) {
                return res.json(400, {error: 'Password must be at least 6 characters!'});
              }
              emailaddresses.validate({
                string: req.param('email'),
              }).exec({
                error: function(err) {
                  return res.serverError(err);
                },
                invalid: function() {
                  return res.badRequest('Doesn\'t look like an email address to me!');
                },
                success: function() {
                  var password = req.param('password');
                  var email = req.param('email');
                  var fullName = req.param('fullName')
                  bcrypt.hash(password, 10, function(err, hash) {
                    if(err) {
                       return res.status(500).json({
                          error: err
                       });
                    }
                    else {
                      var adminObj = {};
                      adminObj.email = email;
                      adminObj.password = hash;
                      adminObj.fullName = fullName;
                      console.log('adminObj', adminObj)
                      adminMdl.createAdmin(adminObj).then((data) => {
                        console.log('data', data);
                        return res.ok({status : "OK"});
                      }).catch((error) => {
                        return res.json(500, {message: 'Internal Error'});
                      });
                    }
                  });
                }
              });
        }catch(e) {
            console.log(e.message)

        }

    },

    login: (req, res) => {
        try{
            var param = req.body;
            var email = param.email;
            var password = param.password;
            console.log(email)
            adminMdl.find().fetchAdminInfo({email: email}, {}).then((userInfo) => {
                var origPassword = userInfo[0].password;
                bcrypt.compare(password, origPassword, function(err, result) {
                    if(result) {
                        req.session.userId  = email;
                        req.session.authenticated = true;
                        req.session.name = userInfo[0].fullName;
                        return res.ok({status : "OK"});
                    }else {
                        return res.json(500, {message: 'Internal Error'});
                    }
                });
            }).catch((error) => {
                console.log(error);
            })
        }catch(e) {
            console.log(e.message);
        }
    },

    logout: (req, res) => {
      try{
        req.session.userId = null;
        req.session.authenticated = null;
        delete req.session.name;
        return res.redirect('/login');

      }catch(e) {
        console.log(e.message);
      }
      
    }

};

