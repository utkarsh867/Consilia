var express = require('express');
var router = express.Router();

//post event of type
router.post("/course_suggestion",function(req,res){
    var db =req.db;
    var selected = req.body.data;
    var passed = {};
    var course_list = {};
    var callbacks = 0;
    var total = 0;

    var temp_passed = []
    for (var year in selected){
        passed[year] = {}
        for (var sem in selected[year]){
            passed[year][sem] = temp_passed
            temp_passed = temp_passed.concat(selected[year][sem])
        }
    }
    Object.keys(selected).forEach(function(year){
        Object.keys(selected[year]).forEach(function(sem){
            var add=true;
            var final_docs=[];
            total += 1;
            callbacks += 1;
            db.get("courses").find({"code":{$ne:{$all: passed[year][sem]}}},{},function(err,doc){
                    if (err) {
                        throw err;
                    } else {
                        for (var i in doc) {
                            for (var j in doc[i].criteria) {
                                var strings_p = doc[i].criteria[j].passed;
                                var strings_e = doc[i].criteria[j].enrolled;
                                if (eachel(passed[year][sem], strings_p) || (!strings_e && eachel(selected[year][sem], strings_e))) {
                                    add = true;
                                } else {
                                    add = false;
                                    break;
                                }
                            }
                            if (add) {
                                if (doc[i]["code"].indexOf("X") === -1 && doc[i]["code"].indexOf("#") === -1 && !(passed[year][sem].indexOf(doc[i]["code"]) > -1)) {
                                    final_docs.push({
                                        "code": doc[i]["code"],
                                        "name": doc[i]["name"] === "" ? doc[i]["code"] : doc[i]["name"]
                                    });
                                }
                            }
                        }
                        if (!(year in course_list)) {
                            course_list[year] = {};
                        }
                        course_list[year][sem] = final_docs;
                        callbacks -= 1;
                        if (total === 8 && callbacks === 0) {
                            res.send(course_list);
                        }
                    }
            });
        });
    });
});

function eachel(set,subset) {
    var h = true;
    for (var i in subset) {
        h=false;
        for (var j in set) {
            if (set[j] === subset[i]) {
                return true;
            }
        }
    }
    return h;
}

function isSubsetOf(set, subset) {
    for (var i = 0; i < set.length; i++) {
        if (subset.indexOf(set[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = router;