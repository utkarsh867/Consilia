var consilia = angular.module('consilia',["checklist-model"]);
consilia.controller('mainCtrlr',function($scope,$http){
    $scope.year = "year-1"
    $scope.selected = {
        "AS":['CAES1000','CENG9001','PHYS1050','MATH1011'],
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

    $scope.courses_selected = []

    $scope.courseList = {}

    $http.post('/courses/course_suggestion',{"data":$scope.selected})
        .then(function(success){
                $scope.courseList = success.data;
        },function(error){
            console.log('Error: ' + err);
        });

    $http.post('/minor/possibleMinor',{"data":$scope.selected})
        .then(function(success){
            $scope.possibleMinors = success.data;
            console.log(success.data);
        },function(error){
            console.log('Error: ' + err);
        });
    $http.post('/major/possibleMajor',{"data":$scope.selected})
        .then(function(success){
            $scope.possibleMajors = success.data;
            console.log(success.data);
        },function(error){
            console.log('Error: ' + err);
        });

    $scope.updateList = function(){
        $http.post('/courses/course_suggestion',{"data":$scope.selected})
            .then(function(success){
                $scope.courseList = success.data;
            },function(error){
                console.log('Error: ' + err);
            });

        $http.post('/minor/possibleMinor',{"data":$scope.selected})
            .then(function(success){
                $scope.possibleMinors = success.data;
                console.log(success.data);
            },function(error){
                console.log('Error: ' + err);
            });
        $http.post('/major/possibleMajor',{"data":$scope.selected})
            .then(function(success){
                $scope.possibleMajors = success.data;
                console.log(success.data);
            },function(error){
                console.log('Error: ' + err);
            });
    }


});