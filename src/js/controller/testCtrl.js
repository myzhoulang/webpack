var app = require('../app')
console.log(require('../service/service'))
console.log(require('../service/dialogs'))
console.log(app)

app.controller('custCtrl', ['$scope', function($scope){
  $scope.name = "zhoulang"
}])

app.controller('HomeCtrl', ['$scope', 'Api', 'dialogs', '$timeout', '$q', function($scope, Api, dialogs, $timeout, $q){
  angular.extend($scope, {
    data:[1,2,3,4]
  });

  // Api.Lines().get({id:1}, function(data){
  //   console.log(data)
  // })
  //
  $scope.alert = function(){
    dialogs.alert({
        template:'<h4>Alert</h4>'
    })
  }

  $scope.custom = function(){
    dialogs.confirm({
        controller:'custCtrl',
        className:'customDialogs',
        // isBackdropClickClose:false,
        locals:{
          age: 12
        },

        resolve:{
          a: function(){
            var defer = $q.defer()
            $timeout(function(){
              defer.resolve(123)
            }, 2000)

            return defer.promise;
          }
        },
        template:'<h4>custom</h4> <p><input class="form-control input-sm" type="number" ng-model="age">{{ name }} ===> {{a}}</p> '
    })
  }

  $scope.confirm = function(){
    dialogs.confirm({
      template:'<p>确定要删除这个？</p>'
    }).then(function(){
      dialogs.alert({
          template:'<p>您删除了！！！</p>'
      })
    }, function(){
      dialogs.alert({
          template:'<p>您取消了</p>'
      })
    })
  }
}])
