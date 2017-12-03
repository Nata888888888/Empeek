var app = angular.module('sayerApp');

app.controller("Controller", sayerController).$inject = ["sayerModel"];

function sayerController($scope, $location, $timeout, sayerModel) {
    $scope.items = sayerModel.topics;
    $scope.tempTopic = [];

    $scope.showAddCommentPage = function(index) {
        $scope.selectedTopic = index;
        $location.path('/comments');
        $scope.new_comment_focus = true;
    }

    $scope.addTopic = function(title) {
        if (title.trim().length == 0)
            return;

        sayerModel.addTopic(title);

        $scope.topicTitle = '';
        $location.path('/');
    }

    $scope.addNewComment = function(id, comment) {
        if (comment.trim().length == 0)
            return;

        sayerModel.addComment(id, comment);
        document.getElementById("newComment").value = "";
    }

    $scope.deleteTopic = function(id, deleteNotConfirmed) {
        if (deleteNotConfirmed) {
            $timeout(function (){
                $scope.tempTopic[id].deleteNotConfirmed = false;
            }, 3000);
            return;
        }
        
        sayerModel.deleteTopic(id);
    }
}

angular.module('sayerApp').run(function($rootScope, $timeout) {
  // tell Angular to call this function when a route change completes
  $rootScope.$on('$routeChangeSuccess', function() {
    // we can't set focus at this point; the DOM isn't ready for us
    // instead, we define a callback to be called after the $digest loop
    $timeout(function(){
      // once this is executed, our input should be focusable, so find (with jQuery)
      // whatever is on the page with the autofocus attribute and focus it; fin.
      $('[autofocus]').focus();
    });
  });
}); 