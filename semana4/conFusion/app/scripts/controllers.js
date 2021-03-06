"use strict";

angular.module('conFusionApp')
    .controller('MenuController', function($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = "";
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading...";

        //[array] of dishes .query()
        menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

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

.controller('FeedbackController', function($scope, feedbackFactory) {
    $scope.sendFeedback = function() {
        console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorret');
        } else {
            $scope.invalidChannelSelection = false;

            //persistindo um feedback db.json
            feedbackFactory.getFeedback().save($scope.feedback);

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

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";

    //pegar um dish(:id) especifico .get
    menuFactory.getDishes().get({
        id: parseInt($stateParams.id)
    }).$promise.then(
        function(response) {
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

})

.controller('DishCommentController', function($scope, menuFactory) {
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

        //update comment of dishes (o prato vai ficar atualizado com o novo comentario)
        menuFactory.getDishes().update({
            id: $scope.dish.id
        }, $scope.dish);

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
})

// implement the IndexController and About Controller here
.controller('IndexController', function($scope, menuFactory, corporateFactory) {

    $scope.showDish = false;
    $scope.showPromotion = false;
    $scope.showLeadership = false
    $scope.message = "Loading ...";

    //$scope.leadership = corporateFactory.getLeader(3);
    corporateFactory.getLeaders().get({
        id: 3
    }).$promise.then(
        function(response) {
            $scope.leadership = response;
            $scope.showLeadership = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

    //pegar um dish(0) especifico .get
    menuFactory.getDishes().get({
        id: 0
    }).$promise.then(
        function(response) {
            $scope.feacturedDish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

    //pegar um promotion(0) especifico .get
    menuFactory.getPromotions().get({
        id: 0
    }).$promise.then(
        function(response) {
            $scope.feacturedPromotion = response;
            $scope.showPromotion = true;
        },
        function(response) {
            $scope.message = "Error:" + response.status + " " + response.statusText;
        }
    );

    /** Trazer um dish aleatório **
    $scope.feacturedDish = menuFactory.getDish(getRandom(menuFactory.getDishes().length));
    function getRandom(max) {
		return Math.floor(Math.random() * max);
	}
    */

})

.controller('AboutController', function($scope, corporateFactory) {

    $scope.showLeaderships = false;
    $scope.message = "Loading...";

    //[array] of Leaderships .query()
    corporateFactory.getLeaders().query(
        function(response) {
            $scope.leaderships = response;
            $scope.showLeaderships = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

});
