// var autoIncrement = require('mongoose-auto-increment');

var conns = {};
var mongoose = {};
var autoIncrements = {};

function getConnection(dbname)
{
    if(conns[dbname] == null)
    {
        var rec = require('./dbs/' + dbname + '/db')
        conns[dbname] = rec.db;
        // autoIncrement.initialize(rec.db);
        mongoose[dbname] = rec.mongoose;
        autoIncrements[dbname] = rec.autoIncrement;
    }
    return conns[dbname];
}

var requiredModels = {};

function getRequiredModel(modelName)
{
    if(requiredModels[modelName] == null)
    {
        path = '../models/' + modelName + ".js";
        requiredModels[modelName] = require(path);
    }
    return requiredModels[modelName];
}

module.exports = {

    getModel: function(dbname, modelName, collectionName) {
        var connction = getConnection(dbname);
        var requiredModel = getRequiredModel(modelName);
        return requiredModel.getCollectionModel(connction, mongoose[dbname], autoIncrements[dbname], collectionName);
    }
} ;