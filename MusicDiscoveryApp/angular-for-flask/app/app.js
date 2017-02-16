var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home');

  $stateProvider

      .state('playlists', {
        url: '/playlists',
        templateUrl: 'playlists/views/playlists.html',
        controller : 'playlistsCtrl',
        controllerAs: 'vm'
      })
      .state('discover', {
          url: '/discover',
          templateUrl: 'discover/views/discover.html',
          controller : 'discoverCtrl',
          controllerAs: 'vm'
      })
      .state('tracks', {
          url: '/tracks',
          controller: 'tracksCtrl',
          params : {
              urlParam: null,
              name: null
          },
          templateUrl : 'playlists/views/tracks.html'
      })
      .state('callback', {
          url: '/callback',
          templateUrl: 'callback/views/callback.html',
          controller : 'callCtrl',
          controllerAs: 'vm'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'home/views/home.html',
        controller : 'homeCtrl',
        controllerAs: 'vm'
      });

});

