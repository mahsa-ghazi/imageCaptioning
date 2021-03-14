var mongoose = require('./mongoose');
var autoIncrement = require('./mongoose-auto-increment');

require('dotenv').config()

var db = mongoose.createConnection(process.env.MONGOOSE_URL);

db.on('error', function (err) {
  if (err) // couldn't connect
    db.db.close();

  // retry if desired
  connect();
});
function connect() {
  db.open('localhost', 'ImageCaptioningAdmin');
}

autoIncrement.initialize(db);
module.exports.mongoose = mongoose;
module.exports.autoIncrement = autoIncrement;
module.exports.db = db;
