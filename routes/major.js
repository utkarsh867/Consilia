var express = require("express");
var router =  express();

router.post('/possibleMajor', function (req, res) {
    var db = req.db;
    var selected = req.body.data;
    var courses = [];
    var majors = ["Civil Engineering", "Computer Engineering", "Electrical Engineering", "Electronic Engineering", "Industrial Engineering and Logistics Management", "Mechanical Engineering", "Biomedical Engineering"];

    if(selected){
        Object.keys(selected).forEach(function (year) {
            Object.keys(selected[year]).forEach(function (semester) {
                selected[year][semester].forEach(function (object) {
                    courses.push(object);
                });
                if(selected[year][semester].length === 0){
                    count++;
                }
            });
        });
    }
    for(var i =0; i<courses.length && i<majors.length; i++){
        var x = Math.floor(Math.random()*majors.length);
        majors.splice(x, 1);
    }
    majors.push("Computer Science");
    res.send(majors);
});