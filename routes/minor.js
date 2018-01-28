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
                courses.push(selected[year][semester]);
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
                if(noOfCourses<=count*2){
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
        for(var i = 0; i<minorC[0].length; i++){
            if(searchIn(minorC[0][i])){
                count++;
                minorC[0].splice(i, 1);
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