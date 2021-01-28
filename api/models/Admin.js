
var models = {};
module.exports = {
  getCollectionModel: function (conn, mongoose, autoIncrement, collectionName) {
    if (models[conn.name] == null) {
      models[conn.name] = {};
    }
    var subSchema = mongoose.Schema({
      //your subschema content
    }, { _id: true });
    if (models[conn.name][collectionName] == null) {
      var schema = new mongoose.Schema( {
        subSchemaCollection: [subSchema],
        email: { type: 'String', require: false, unique: true },
        password: { type: 'String', require: false, unique: true },
        fullName: { type: 'String', require: false, unique: false },
      },
        { collection: collectionName });

      schema.statics.createAdmin = function (param, cb) {
        try {
          return new Promise((resolve, reject) => {
            this.create(param, (err, data) => {
              if (err) {
                mongoose.connection.close();
                reject(err);
              } else if (data) {
                mongoose.connection.close();
                resolve(data);
              }
            });
          });
        }
        catch (e) {
          mongoose.connection.close();
          console.log('an error was occured in *createAdmin* function in Admin Model ', e.message);
        }
      };

      schema.query.fetchAdminInfo = function (param, projection, cb) {
        try {
          return new Promise((resolve, reject) => {
            this.where(param).select(projection)
              .exec(function (err, data) {
                if (err) {
                  mongoose.connection.close();
                  reject(err);
                } else if (data && data.length > 0) {
                  mongoose.connection.close();
                  resolve(data);
                } else {
                  mongoose.connection.close();
                  resolve([]);
                }
              });
          });
        }
        catch (e) {
          mongoose.connection.close();
          console.log('an error was occured in *fetchAdminInfo* function in Admin Model ', e.message);
        }
      };

      schema.index({username: 1 });
      schema.plugin(autoIncrement.plugin, conn.name + '-' + collectionName);
      models[conn.name][collectionName] = conn.model(collectionName, schema);
    }
    return models[conn.name][collectionName];
  }
}

