"use strict";

angular.module('conFusionApp')
    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', function($http, baseURL, $resource) {

        this.getDishes = function() {
            //return $http.get(baseURL + "dishes");
            return $resource(baseURL + "dishes/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };

        // implement a function named getPromotion
        // that returns a selected promotion.
        this.getPromotions = function(index) {
            return $resource(baseURL + "promotions/:id", null);
        };
    })

.factory('corporateFactory', function($resource) {

    var corpfac = {};
    var baseURL = "http://localhost:3000/";

    // Implement two functions, one named getLeaders,
    corpfac.getLeaders = function() {
        return $resource(baseURL + "leadership/:id", null);
    };

    // Remember this is a factory not a service
    return corpfac;
})

.factory('feedbackFactory', function($resource) {

    var feedfac = {};
    var baseURL = "http://localhost:3000/";

    feedfac.getFeedback = function() {
        return $resource(baseURL + "feedback/:id", null, {
            'save': {
                method: 'POST'
            }
        });
    };

    return feedfac;

});
