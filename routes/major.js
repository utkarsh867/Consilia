var express = require("express");
var router =  express();

router.post('/possibleMajor', function (req, res) {
    var db = req.db;
    var selected = req.body.data;
    delete selected['AS'];
    var courses = [];
    var majors = ["Computer Engineering", "Electrical Engineering", "Electronic Engineering", "Civil Engineering", "Industrial Engineering and Logistics Management", "Mechanical Engineering", "Biomedical Engineering"];
    if(selected){
        Object.keys(selected).forEach(function (year) {
            Object.keys(selected[year]).forEach(function (semester) {
                selected[year][semester].forEach(function (object) {
                    courses.push(object);
                });
            });
        });
    }
    if(courses.indexOf("ENGG1202")>0){
        majors.splice(3);
    }
    if(courses.indexOf("ENGG1203")>0){
        majors.splice(2);
    }
    if(courses.indexOf("COMP2121")>0){
        majors.splice(0);
    }
    majors.push("Computer Science");
    res.send(majors);
});

module.exports=router;