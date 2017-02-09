var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('/', {
            url: '/',
            templateUrl : '../static/partials/index.html',
            controller  : 'mainCtrl',
            controllerAs: 'vm'
        })
        .state('home', {
            url: '/home',
            templateUrl: '../templates/home.html',
            controller : 'homeCtrl',
            controllerAs: 'vm'
        });
        // .state('student', {
        //     url: '/student',
        //     templateUrl : 'student.html',
        //     controller  : 'libraryCtrl',
        //     controllerAs: 'vm'
        // });

});

