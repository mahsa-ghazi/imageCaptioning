
module.exports = function(req, res, next) {

    if (req.session.authenticated && req.session.userId ) {
  
      return next();
    }
    else {

      var object = {};
      object.error = 'You are not permitted to perform this action.';
      object.message = 'You are not permitted to perform this action.';
     // console.log('was not found');
      return res.forbidden(object);
    }
  };
  