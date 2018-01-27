var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var url = "mongodb://127.0.0.1:27017";
var monk=require('monk')
var db=monk("localhost:27017/counsilia")
//post event of type
router.get("/course_suggestion",function(req,res){
    var mockdata_passed={passed:["ENGG1111"]}
    var query={}
    var passed=mockdata_passed.passed
    /*
    db.get("courses").find({"code":{$ne:{$all:mockdata_passed.passed}},$not:{$elemMatch:{$nin:}}}
    ,{},function(err,doc){
        if(err)
            throw err;

        res.send(doc);
        })
    */
})
router.get("/course_period",function (req,res){
    //To clarify about the year param
    var query={};
    var year=[1,2,3,4]
    if (req.query.yr)
        query.year=year.splice(req.query.yr-1)

    if(req.query.sem)
        query.semester=parseInt(req.query.sem);
    console.log(query)
    db.get("courses").find(query,{},function(err,doc) {
        if(err)
            throw err
        res.send(doc);

    })


})

module.exports=router