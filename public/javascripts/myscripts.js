var consilia = angular.module('consilia',["checklist-model"]);
consilia.controller('mainCtrlr',function($scope,$http){
    $scope.selected = {
        "year-1":{
            "sem1":[],
            "sem2":[]
        },
        "year-2":{
            "sem1":[],
            "sem2":[]
        },
        "year-3":{
            "sem1":[],
            "sem2":[]
        },
        "year-4":{
            "sem1":[],
            "sem2":[]
        }
    };

    $scope.courseList = {}

    $http.post('/courses/course_suggestion',{"data":$scope.selected})
        .then(function(success){
                $scope.courseList = success.data;
                console.log(success.data);
        },function(error){
            console.log('Error: ' + err);
        });


});