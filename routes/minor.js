var express = require('express');
var router = express();

router.post('/possibleMinor', function (req,res) {
    var db = req.db;
    var selected = req.body.data;
    var courses = [];
    var count = 0;
    //Populate the array
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

    var minorOptions = {};
    var possibleMinors = [];
    //Get minors from database
    db.get("curriculum").find({'Minor':{$exists:true}}, function (err, docs) {
        if(err){
            throw err;
        }
        else{
            docs.forEach(function (faculty) {
                minorOptions = Object.assign(faculty.Minor);
            });

            Object.keys(minorOptions).forEach(function (minorOption) {
                var noOfCourses = getMatches(courses, minorOptions[minorOption]);
                var remCourses = minorOptions[minorOption].length - noOfCourses;
                var remSemesters = count;
                if(remCourses<remSemesters*1.5){
                    possibleMinors.push(minorOption);
                }
            });
            res.send(possibleMinors);
        }
    });
});

function getMatches(courses, minorC) {
    var count = 0;
    courses.forEach(function (course) {
        for(var i = 0; i<minorC.length; i++){
            if(searchIn(minorC[i], course)){
                count++;
                minorC.splice(i, 1);
                break;
            }
        }
    });
    return count;
}

function searchIn(cList, courseCode) {
    if(cList.indexOf(courseCode)>=0){
        return true;
    }
    else{
        return false;
    }
}

module.exports = router;