
module.exports.routes = {

  'POST /api/v1/admin/register': { controller: 'AdminController', action: 'register' },
  'POST /api/v1/admin/login': { controller: 'AdminController', action: 'login' },
  'GET /logout': { controller: 'AdminController', action: 'logout' },

  'GET /api/v1/caption/list': { controller: 'CaptionController', action: 'captionsList' },
  'POST /api/v1/caption/saveCorrectTraslation': { controller: 'CaptionController', action: 'saveCorrectTraslation' },
  'GET /api/v1/caption/loadImage': { controller: 'CaptionController', action: 'loadImage' },
  'GET /api/v1/caption/edit': { controller: 'CaptionController', action: 'editTranslatedSentences' },
  

  '/register': {
    view: 'register',
    locals: {
      layout: false
    }
  },

  '/login': {
    view: 'login',
    locals: {
      layout: false
    }
  },

  '/403': {
    controller: 'AdminController',
    action    : 'login',
    view      : '403',
  },

  '/': {
    view: 'login',
    locals: {
      layout: false
    }
  },

  '/main/dashboard': {
    view: 'pages/homepage',
    locals: {
      layout: '/layouts/layout.ejs'
    } 
  },
};
