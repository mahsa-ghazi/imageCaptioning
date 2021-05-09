
const appConfig = require('../../config/appconfig');
var mainDb = require('../services/db');
const fs = require("fs")
const fileManagementService = require("../services/fileManagement");
var cocoImageUrl = "https://filebox.ece.vt.edu/~aroma/web/coco_images/train2014/COCO_train2014_000000";
const mysqlConnection = require("../services/mysqlConnection");
const { Console } = require('console');
require('dotenv').config()

module.exports = {
  
    captionsList : (req, res) => {

        var pagenum = req.param('pagenum');
        var pagesize = req.param('pagesize');
        var start = pagenum * pagesize;
        var query = "SELECT * FROM `data_entries` WHERE `is_translated`= 1 and is_correct = 0 limit " + start + "," + pagesize; 
        var AllTotalRowQuery = "SELECT count(*) as TotalRows FROM `data_entries` WHERE `is_translated`= 1 and is_correct = 0  ";
        mysqlConnection.mysqlConn('image_captioning').then((connetcion) => {
            mysqlConnection.query(connetcion, AllTotalRowQuery).then((countResponse) => {
                mysqlConnection.query(connetcion, query).then((result) => {
                    var totalArray = [];
                    result.forEach((currentRes) => {
                        var tmp = {};
                        tmp.imageId = currentRes.image_id;
                        tmp.sentences = currentRes.translated_txt;
                        tmp.caption = currentRes.caption;
                        tmp.id = currentRes.id;
                        totalArray.push(tmp);
                    });
                    var totalRes = {"Rows": totalArray, "TotalRows": countResponse[0].TotalRows}
                    return res.ok(totalRes);
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((err) => {
                console.log(err);
            });
            }).catch((error) => {
                console.log(error);
            });
       
    },
    
    saveCorrectTraslation : (req, res) => {
        var param = req.body;
        var response = {};
        var totalIds = param.totalId;
        totalIds = totalIds.toString()
        var updateQuery = "UPDATE data_entries SET is_correct = 1  WHERE id IN (" + totalIds + ")";
        mysqlConnection.mysqlConn('image_captioning').then((connetcion) => {
            mysqlConnection.query(connetcion, updateQuery).then((countResponse) => {
                var affectedRows = countResponse.affectedRows;
                    console.log(affectedRows);
                    response.statusCode = 200;
                    response.message = "درخواست شما ثبت شد";
                    return res.ok(response);
            }).catch((err) => {
                console.log(err);
            });
            }).catch((error) => {
            })
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
        mysqlConnection.mysqlConn('image_captioning').then((connetcion) => {
            mysqlConnection.query(connetcion, updateQuery).then((countResponse) => {
                var affectedRows = countResponse.affectedRows;
                    console.log(affectedRows);
                    response.statusCode = 200;
                    response.message = "درخواست شما ثبت شد";
                    return res.ok(response);
            }).catch((err) => {
                console.log(err);
            });
            }).catch((error) => {
                console.log(error);
            });
    }
};

