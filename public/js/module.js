'use strict';

var app = angular.module('angularApp', ['ui.router', 'satellizer']);
app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

        $authProvider.github({
            clientId: '3ce5cb16153cbb62551e'

        });

        $authProvider.google({
            clientId: '771142404121-evshu82nqppk0k3nodbl9eber4e0fr4j.apps.googleusercontent.com'
        });
        $authProvider.facebook({
            clientId: '897418913717572'
        });


    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('newitem', {
            url: '/listing/new',
            templateUrl: '/html/newlisting.html',
            controller: 'newItemCtrl'
        })
        .state('viewitems', {
            url: '/items/browse',
            templateUrl: '/html/browselistings.html',
            controller: 'itemCtrl'
        })
        .state('itemdetail', {
            url: '/listings/:id',
            templateUrl: '/html/listingdetail.html',
            controller: 'itemDetailCtrl'
        })
        .state('login', {
            url: '/login/',
            templateUrl: '/html/login.html',
            controller: 'loginCtrl'
        })
        .state('myprofile', {
            url: '/myprofile/',
            templateUrl: '/html/userprofile.html',
            controller: 'profileCtrl'
        })
        .state('register', {
            url: '/newuser/',
            templateUrl: '/html/register.html',
            controller: 'registerCtrl'
        })
        .state('editprofile', {
            url: '/profile/edit',
            templateUrl: '/html/editprofile.html',
            controller: 'editCtrl'
        })


    $urlRouterProvider.otherwise('/');

})
