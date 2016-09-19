var app = require('../app')

function Dialogs(){
  this.name = name
  this.resolveKeys = []
}

Dialogs.prototype.creatHTML = function(config){
  var header = '<div class="dialog-header">'+config.dialogHeader+'</div>'
  var footer = '<div class="dialog-footer">'+config.dialogFooter+'</div>'
  var _template = '<div class="dialog-content">' + (config.template)+'</div>'
  var _templateUrl = config.templateUrl
  var templateCache = this.$templateCache
  var q = this.$q
  var defer = q.defer()

  if(_templateUrl){
    http.get(_templateUrl, {
      cache: templateCache
    }).then(function(response){
      defer.resolve(response.data)
    })
  }else{
    return q.when('<div class="dialog-bg '+config.backdropClass+'" ng-click="DropCloseDialogs($event)"><div ng-click="$event.stopPropagation()" class="dialog-box '+config.className+'">'+
      (header + _template + footer)+
      '<i ng-click="close($event)" class="dialog-icon-close">&times;</i></div></div>')
  }
  return defer.promise
}


Dialogs.prototype.resolve = function(config){
  var q = this.$q
  if(angular.isObject(config.resolve)){
    for(var attr in config.resolve){
      this.resolveKeys.push(attr)
      resolves.push(config.resolve[attr]())
    }
  }
  return q.all(resolves)
}

Dialogs.prototype.modal = function(config){
  var http = this.$http
  var q = this.$q
  var compile = this.$compile
  var rootScope = this.$rootScope
  var controller = this.$controller
  var animate = this.$animate


  var scope = rootScope.$new();
  var sController = config.controller || null
  var controllerAs = config.controllerAs
  var element = null
  var defer = q.defer()
  var locals = config.locals || {}
  var container = angular.element(config.container || document.body)
  var self = this
  var resolves = []
  var keys = []



  this.resolve(config).then(function(data){
    angular.forEach(data, function(item, index){
      scope[this.resolveKeys[index]] = item;
    });
    return self.creatHTML(config);
  }).then(function(data){
    if(!element){
      element = angular.element(data)
      if (sController) {
        locals.$scope = scope;
        var ctrl = controller(sController, locals);
        if (controllerAs) {
          scope[controllerAs] = ctrl;
        }else if (locals) {
          for (var prop in locals) {
            scope[prop] = locals[prop];
          }
        }
      }
      compile(element)(scope);
      return animate.enter(element, container);
    }
  })

  scope.ok = function($event){
    element.remove()
    scope.$destroy()

    if(angular.isFunction(config.okCallback)){
      config.okCallback($event,scope)
    }
    defer.resolve(scope)
  }

  scope.DropCloseDialogs = function(){
    if(angular.isUndefined(config.isBackdropClickClose) || config.isBackdropClickClose){
      scope.close();
    }
  }

  scope.close = function(){
    element.remove()
    scope.$destroy()
  }

  scope.cancel = function($event){
    scope.close()
    defer.reject()

    if(angular.isFunction(config.cancelCallback)){
      config.cancelCallback($event,scope)
    }
  }

  return defer.promise;
}

Dialogs.prototype.alert = function(config){
  var cof = angular.extend(config, {
    dialogHeader: '<h3 class="dialog-title">'+(config.title || '温馨提示')+'</h3>',
    dialogFooter: '<button class="btn-sm btn-primary " ng-click="ok($event)">确定</button>'
  })
  return this.modal(cof)
}

Dialogs.prototype.confirm = function(config){
  var cof = angular.extend(config, {
    dialogHeader: '<h3 class="dialog-title">'+(config.title || '温馨提示')+'</h3>',
    dialogFooter: '<button class="btn-sm btn-primary " ng-click="ok($event)">确定</button><button class="btn-sm btn-primary " ng-click="cancel($event)">取消</button>'
  })
  return this.modal(cof)
}

app.provider('dialogs', {
  instance: new Dialogs(),

  $get:['$document', '$compile', '$q', '$http', '$rootScope', '$controller', '$animate', '$templateCache',
  function($document, $compile, $q, $http, $rootScope, $controller, $animate, $templateCache){
    this.instance.$document = $document
    this.instance.$compile = $compile
    this.instance.$q = $q
    this.instance.$http = $http
    this.instance.$controller = $controller
    this.instance.$rootScope = $rootScope
    this.instance.$animate = $animate
    this.templateCache = $templateCache
    return this.instance
  }]
})
