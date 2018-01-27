var express = require('express');
var router = express.Router();

//post event of type
router.get("/course_suggestion",function(req,res){
    var db =req.db;
    var mockdata_passed={passed:["ENGG1111"],enrolled:["ENGG1111"]}
    //,enrolled:[]

    var add=true;
    var query={}
    var passed=mockdata_passed.passed
    var final_docs=[]
    db.get("courses").find({"code":{$ne:{$all:mockdata_passed.passed}}}
        ,{},function(err,doc){
            if(err)
                throw err;
            for(var i in doc)
            {
                for ( var j in doc[i].criteria){
                    var strings_p=doc[i].criteria[j].passed
                    var strings_e=doc[i].criteria[j].enrolled
                    console.log(strings_p,strings_e,eachel(mockdata_passed.passed,strings_p),!strings_e,eachel(mockdata_passed.enrolled,strings_e))
                    if(eachel(mockdata_passed.passed,strings_p) ||(!strings_e&&eachel(mockdata_passed.enrolled,strings_e)))
                    {
                        add=true;}
                    else {
                        add = false;
                        break;
                    }

                }
                if(add)
                    final_docs.push(doc[i]);
            }
            res.send(final_docs);
        })

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