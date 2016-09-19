var app = require('../app')
require('../service/service')
console.log(app)

app.controller('HomeCtrl', ['$scope', 'Api', function($scope, Api){
  angular.extend($scope, {
    data:[1,2,3,4]
  });

  Api.Lines().get({id:1}, function(data){
    console.log(data)
  })
}])
