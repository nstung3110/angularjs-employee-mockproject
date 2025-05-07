var app = angular.module('mockApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    })
    .when('/form', {
      templateUrl: 'form.html',
      controller: 'FormController',
      controllerAs: 'formCtrl'
    })
    .otherwise({ redirectTo: '/' });
});

app.directive('myDirective', function() {
  return {
    template: '<strong>This is a custom directive!</strong>'
  };
});

app.controller('HomeController', function($http) {
  var vm = this;
  vm.users = [];
  vm.loading = true;
  vm.error = false;

  $http.get('https://jsonplaceholder.typicode.com/users')
    .then(function(response) {
      vm.users = response.data;
      vm.loading = false;
    })
    .catch(function(error) {
      vm.error = true;
      vm.loading = false;
    });
});

app.controller('FormController', function() {
  var vm = this;
  vm.employee = {};
  vm.employees = [];
  vm.editIndex = -1;
  vm.submitted = false;
  vm.searchKeyword = '';

  vm.submitForm = function() {
    if (vm.employee.name && vm.employee.email && vm.employee.position) {
      if (vm.editIndex === -1) {
        vm.employees.push(angular.copy(vm.employee));
      } else {
        vm.employees[vm.editIndex] = angular.copy(vm.employee);
        vm.editIndex = -1;
      }
      vm.employee = {};
      vm.submitted = true;
    }
  };

  vm.editEmployee = function(index) {
    vm.employee = angular.copy(vm.employees[index]);
    vm.editIndex = index;
  };

  vm.deleteEmployee = function(index) {
    vm.employees.splice(index, 1);
    if (vm.editIndex === index) {
      vm.employee = {};
      vm.editIndex = -1;
    }
  };

  vm.filterEmployees = function(emp) {
    if (!vm.searchKeyword) return true;
    var keyword = vm.searchKeyword.toLowerCase();
    return (
      emp.name.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword) ||
      emp.position.toLowerCase().includes(keyword)
    );
  };
});