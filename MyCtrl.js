 var nombre,edad;

        app = angular.module('ModalDemo', []);
        app.directive('modalDialog', function() {
        return {
            restrict: 'AE',
            scope: {
            show: '='
            },
            replace: true,
            transclude: true, 
            link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function() {
                scope.show = false;
            };
            },
            template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
        };
        });
        
        app.config(function($httpProvider) {
            //Enable cross domain calls
            $httpProvider.defaults.useXDomain = true;

            //Remove the header containing XMLHttpRequest used to identify ajax call 
            //that would prevent CORS from working

        });

        app.controller('MyCtrl', ['$scope','$http' ,function($scope,$http) {
            $scope.modalShown = false;
            $scope.toggleModal = function() {
                $scope.modalShown = !$scope.modalShown;
                if($scope.modalShown == false && !((document.getElementById("edad").value=="")||(document.getElementById("nombre").value="")))
                {
                    $scope.empleados.push({ 'nombre':nombre, 'edad':edad });
                    $scope.DardeAlta(nombre,edad);
                    document.getElementById("nombre").value="";
                    document.getElementById("edad").value="";
                }
            };

            $scope.saveInformation = function(){
                nombre  = document.getElementById("nombre").value;
                edad    = document.getElementById("edad").value;
            };

            $scope.empleados = [];
            $http({
                method : 'GET',
                url : 'http://localhost:57694/api/example'
                /*headers: {
                'Origin': 'http://127.0.0.1'
                }*/
            }).success(function(data, status, headers, config) {
                $scope.empleados = data;
            }).error(function(data, status, headers, config) {
                alert( "failure");
            });

            $scope.DardeAlta =function (nombreVal,edadVal)
            { 
                $http({
                    method : 'POST',
                    url : 'http://localhost:57694/api/example/',
                    data: {'edad':edadVal, 'nombre':nombreVal}
                }).success(function(data, status, headers, config) {
                    alert("Se dio de alta el Usuario");
                }).error(function(data, status, headers, config) {
                    alert( "No se pudo dar de alta el usuario");
                });
            }
        }]);