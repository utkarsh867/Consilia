var consilia = angular.module('consilia',["checklist-model"]);
consilia.controller('mainCtrlr',function($scope,$http){
    $scope.courseList = {
        "year-1":{
            "sem1":["A","B","C"],
            "sem2":["A","B","C"]
        }
    }

    $scope.selected = {
        "year-1":{
            "sem1":["A","B","C"],
            "sem2":["A","B","C"]
        },
        "year-2":{
            "sem1":["A","B","C"],
            "sem2":["A","B","C"]
        },
        "year-3":{
            "sem1":["A","B","C"],
            "sem2":["A","B","C"]
        },
        "year-4":{
            "sem1":["A","B","C"],
            "sem2":["A","B","C"]
        }
    };

});