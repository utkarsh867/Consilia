var express = require('express');
var router = express.Router();

//post event of type
router.post("/course_suggestion",function(req,res){
    var db =req.db;
    var selected = req.body.data
    var passed = []
    var enrolled = []
    var course_list = {}
    var callbacks = 0
    var total = 0
    Object.keys(selected).forEach(function(year){
        Object.keys(selected[year]).forEach(function(sem){
            var enrolled = selected[year][sem]
            var add=true;
            var final_docs=[]
            total += 1
            callbacks += 1
            db.get("courses").find({"code":{$ne:{$all:passed}}},{"code":1,"name":1},function(err,doc){
                    if(err)
                        throw err;
                    for(var i in doc)
                    {
                        for ( var j in doc[i].criteria){
                            var strings_p=doc[i].criteria[j].passed
                            var strings_e=doc[i].criteria[j].enrolled
                            if(eachel(passed,strings_p) ||(!strings_e&&eachel(enrolled,strings_e)))
                            {
                                add=true;}
                            else {
                                add = false;
                                break;
                            }

                        }
                        if(add)
                        {final_docs.push(doc[i]);}
                    }
                    if (year in course_list){
                        course_list[year][sem] = final_docs;
                    } else {
                        course_list[year] = {};
                        course_list[year][sem] = final_docs;
                    }
                    callbacks -= 1;
                    if (total == 8 && callbacks == 0){
                        res.send(course_list);
                    }
            })
            passed.concat(enrolled)
        });
    });
})
router.get("/course_period",function (req,res){
    var db=req.db;
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
function eachel(set,subset) {
    var h = true;
    for (var i in subset) {
        h=false;
        for (var j in set) {
            if (set[j] == subset[i]) {
                h = true;
                break;
            }
        }
    }
    return h;
}
function isSubsetOf(set, subset) {
    for (var i = 0; i < set.length; i++) {
        if (subset.indexOf(set[i]) == -1) {
            return false;
        }
    }
    return true;
}