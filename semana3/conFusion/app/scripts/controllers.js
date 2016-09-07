"use strict";

angular.module('conFusionApp')
    .controller('MenuController', function($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = "";
        $scope.showDetails = false;

        $scope.dishes = menuFactory.getDishes();

        $scope.isSelected = function(checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    })

.controller('ContactController', function($scope) {
    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
})

.controller('FeedbackController', function($scope) {
    $scope.sendFeedback = function() {
        console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorret');
        } else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
})

.controller('DishDetailController', function($scope, $stateParams, menuFactory) {

    var param = parseInt($stateParams.id, 10);
    $scope.dish = menuFactory.getDish(param);

})

.controller('DishCommentController', function($scope) {
    //Step 1: Create a JavaScript object to hold the comment from the form
    $scope.comment = {
        rating: "5",
        comment: "",
        author: "",
        date: null
    };

    $scope.commentTemp = function() {
        if ($scope.comment.comment != "" && $scope.comment.comment != null) {
            return true;
        } else {
            return false;
        }
    };

    $scope.submitComment = function() {
        //Step 2: This is how you record the date
        //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
        $scope.comment.date = new Date().toISOString();
        console.log($scope.comment);

        // Step 3: Push your comment into the dish's comment array
        $scope.dish.comments.push($scope.comment);

        //Step 4: reset your form to pristine
        $scope.commentsForm.$setPristine();

        //Step 5: reset your JavaScript object that holds your comment
        $scope.comment = {
            rating: "5",
            comment: "",
            author: "",
            date: null
        };
    };
});
