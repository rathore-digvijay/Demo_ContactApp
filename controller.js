
var myApp = angular.module('myApp', []);
myApp.controller('MyController', ['$scope', '$http', function($scope, $http) {


    $scope.refresh = function(){
        $http({method : 'GET', url : "/viewlist"}).then(function(res){
        console.log(res);
        $scope.List = res.data;
    })
    };

    
    $scope.delete = function(cid){
        $http({ method: 'POST', url : "/delete", data : {cid : cid }}).then(function(res){
            console.log(res);
            $scope.refresh();
        }, function(err){
            console.log(err);
        });
        console.log("delete");
    };

    $scope.update = function(cid, name, number){
        console.log(cid, name, number);
        $http({method : 'POST', url : "/update", data : { cid : cid, name : name, number : number}}).then(function(res) {
            console.log(res);
            $scope.refresh();
        },function(err) {
            console.log(err);
        });
    }

    $scope.edit = function(contact){
        console.log(contact);
        $scope.contact = contact;
    
    }

    $scope.clear = function() {
        $scope.contact = {};
    }

    console.log("Hello World from controller");
    

    $scope.refresh();
}]);
