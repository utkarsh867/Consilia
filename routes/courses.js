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
    var advanced_standing = selected['AS']
    var temp_passed = selected['AS']
    delete selected['AS']

    for (var year in selected){
        passed[year] = {}
        for (var sem in selected[year]){
            passed[year][sem] = temp_passed
            temp_passed = temp_passed.concat(selected[year][sem])
        }
    }

    var all_selected = passed['year-4']['sem2'].concat(selected['year-2']['sem2'])

    Object.keys(selected).forEach(function(year){
        Object.keys(selected[year]).forEach(function(sem){
            var semester;
            if (sem === 'sem1'){
                semester = 1;
            } else {
                semester = 2;
            }
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
                                if (doc[i]["code"].indexOf("X") === -1 && doc[i]["code"].indexOf("#") === -1 && (arr_diff(all_selected,selected[year][sem]).indexOf(doc[i]["code"]) === -1) && (advanced_standing.indexOf(doc[i]["code"]) === -1) && (doc[i]["semester"] == semester || doc[i]["semester"] == 4)) {
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
        h = false;
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

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

module.exports = router;