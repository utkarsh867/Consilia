var express = require('express');
var router = express.Router();

//MongoDB database
var mongodb = require('mongodb');
var url = "mongodb://127.0.0.1:27017";

/* GET home page. */
router.get('/', function(req, res, next) {
    mongodb.MongoClient.connect(url, function (err,db) {
        if(err){
            console.log(err);
        }
        else{
            try{
                console.log(JSON.stringify(db));
                res.send("Connected to database\n\r");
            }catch (exception){
                console.log(exception);
                res.send("Connected to database\n\r");
            }
        }
    });
});

module.exports = router;
