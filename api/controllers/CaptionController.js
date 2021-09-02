
const appConfig = require('../../config/appconfig');
var mainDb = require('../services/db');
const fs = require("fs")
const fileManagementService = require("../services/fileManagement");
var cocoImageUrl = "https://filebox.ece.vt.edu/~aroma/web/coco_images/train2014/COCO_train2014_000000";
const mysqlConnection = require("../services/mysqlConnection");
const { Console } = require('console');
require('dotenv').config()
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : process.env.DATABASE_HOST || '127.0.0.1',
    user     : 'root',
    password : 'shenasa123',
    database : 'image_captioning',
    port: 3306,
    insecureAuth: true
  });

module.exports = {
  
    captionsList : (req, res) => {

        var pagenum = req.param('pagenum');
        var pagesize = req.param('pagesize');
        var start = pagenum * pagesize;
        // var query = "SELECT * FROM `data_entries`  limit " + start + "," + pagesize; 
        // var AllTotalRowQuery = "SELECT count(*) as TotalRows FROM `data_entries`  ";

        var query = "SELECT * FROM `data_entries` WHERE `is_updated`= 1 and is_correct = 0 limit " + start + "," + pagesize; 
        var AllTotalRowQuery = "SELECT count(*) as TotalRows FROM `data_entries` WHERE `is_updated`= 1 and is_correct = 0  ";

        pool.query(query, function (error, results, fields) {
            var totalArray = [];
            console.log( error )
            results.forEach((currentRes) => {
                var tmp = {};
                tmp.imageId = currentRes.image_id;
                tmp.sentences = currentRes.translated_txt;
                tmp.caption = currentRes.caption;
                tmp.id = currentRes.id;
                totalArray.push(tmp);
            });
            pool.query(AllTotalRowQuery, function (error, countResponse, fields) {
                var totalRes = {"Rows": totalArray, "TotalRows": countResponse[0].TotalRows}
                    return res.ok(totalRes);
            });
        });
    },
    
    saveCorrectTraslation : (req, res) => {
        var param = req.body;
        var response = {};
        var totalIds = param.totalId;
        totalIds = totalIds.toString()
        var updateQuery = "UPDATE data_entries SET is_correct = 1  WHERE id IN (" + totalIds + ")";

        pool.query(updateQuery, function (error, countResponse, fields) {
            var affectedRows = countResponse.affectedRows;
            response.statusCode = 200;
            response.message = "درخواست شما ثبت شد";
            return res.ok(response);
        });
    },

    loadImage : (req, res) => {

        var response = {}
        var imageId = req.param('imageId');
        imageUrl = cocoImageUrl + imageId + ".jpg"
        response.statusCode = 200;
        response.data = imageUrl;
        return res.ok(response); 
    },

    editTranslatedSentences : (req, res) => {
        var response = {}
        var recordId = req.param('recordId');
        var translatedData = req.param('translatedData');
        var updateQuery = "UPDATE data_entries SET 	translated_txt = '" + translatedData + "'  WHERE id = " + recordId + "";
        pool.query(updateQuery, function (error, countResponse, fields) {
            var affectedRows = countResponse.affectedRows;
            response.statusCode = 200;
            response.message = " :) درخواست شما ثبت شد";
            return res.ok(response);
        });
    }
};

