var app = angular.module('sayerApp');

app.controller("Controller", sayerController).$inject = ["sayerModel"];

function sayerController($scope, $location, $timeout, sayerModel) {
    $scope.items = sayerModel.topics;
    $scope.tempTopic = [];

    $scope.showAddCommentPage = function(index) {
        $scope.selectedTopic = index;
        $location.path('/comments')
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