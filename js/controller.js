var app = angular.module('sayerApp');

app.controller("Controller", sayerController).$inject = ["sayerModel"];

function isDeleteButton(elem) {
    if ($(elem).attr('name') == "btnDeleteTopic")
        return true;

    if ($(elem.parentElement).attr("name") == "btnDeleteTopic")
        return true;

    return false;
}

function sayerController($scope, $location, $timeout, sayerModel) {
    $scope.topics = sayerModel.topics;
    $scope.tempTopic = [];

    $scope.showAddCommentPage = function(topic, event) {
        if (isDeleteButton(event.target))
            return;

        $scope.selectedTopic = topic;
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

    $scope.addOrUpdateComment = function(id, commentText, commentId) {
        if (commentText.trim().length == 0)
            return;
        if (commentId == undefined) {
            sayerModel.addComment(id, commentText);
            $(".comments-list").animate({
                scrollTop: $(".comments-list")[0].scrollHeight
            }, 300);
        } else {
            sayerModel.updateComment(id, commentText, commentId);
        }

        $('#newComment').val("");
        $('#newComment').focus();
    }

    $scope.deleteTopic = function(id, deleteNotConfirmed) {
        if (deleteNotConfirmed) {
            $timeout(function() {
                $scope.tempTopic[id].deleteNotConfirmed = false;
            }, 3000);
            return;
        }

        sayerModel.deleteTopic(id);
    }

    $scope.deleteComment = function(topicId, comment) {
        sayerModel.deleteComment(topicId, comment.id);
    }

    $scope.editComment = function(topicId, comment) {
        $scope.edit_comment_id = comment.id;
        $('#newComment').val(comment.text);
        $('#newComment').focus();
    }

    $scope.onNewCommentEnter = function(e, newComment) {
        if (e.key != "Enter")
            return;

        $scope.addOrUpdateComment($scope.selectedTopic.id, newComment, $scope.edit_comment_id);
        $scope.edit_comment_id = undefined;
    }

    $scope.onNewTopicEnter = function(e, newTopic) {
        if (e.key != "Enter")
            return;

        $scope.addTopic(newTopic);
    }
}

angular.module('sayerApp').run(function($rootScope, $timeout) {
    // tell Angular to call this function when a route change completes
    $rootScope.$on('$routeChangeSuccess', function() {
        // we can't set focus at this point; the DOM isn't ready for us
        // instead, we define a callback to be called after the $digest loop
        $timeout(function() {
            // once this is executed, our input should be focusable, so find (with jQuery)
            // whatever is on the page with the autofocus attribute and focus it; fin.
            $('[autofocus]').focus();
        });
    });

    function isIeBrowser() {
        var trident = {
            string: navigator.userAgent.match(/Trident\/(\d+)/)
        };

        trident.version = trident.string ? parseInt(trident.string[1], 10) : null;

        if (trident.string && trident.version < 9) {
            return true;
        }
    }

    if (isIeBrowser()) {
        $(".warning").show();
    }
});