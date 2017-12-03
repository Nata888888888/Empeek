var app = angular.module('myApp');

    app.controller("Controller", function($scope, $location) {
        
        function saveToLocalStorage() {
            var json = angular.toJson($scope.items);
            
            localStorage.setItem("messages", json);
        }
        
        function loadFromLocalStorage() {
            var json = localStorage.getItem("messages");
            
            $scope.items = json ? angular.fromJson(json) : null;
            
            return $scope.items;
        }
        
        if (!loadFromLocalStorage()) {
            $scope.items = [{
                id:"1",
                title:'First item with customized long title',
                comments: [{text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.", color: "red"}, 
                           {text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", color: "green"}]
            },{
                id: "2",
                title: 'Second item',
                comments: []
            },{
                id: "3",
                title: 'Third item (short one)',
                comments: [{text: 'Lorem ipsum', color: "blue"}],
            }];
            saveToLocalStorage();
        }
        
        $scope.lastId = $scope.items.length;
        $scope.showAddCommentPage = function(index){
            $scope.selectedTopic = index;
            //window.location = '#!/comments';
            $location.path('/comments')
        }
        $scope.topicTitle = '';
        $scope.topic = '';
        
        $scope.addTopic = function(title){
            $scope.lastId++;
            $scope.topic = '';
          if(title.trim().length > 0){  
            var newTopic = {
                id:$scope.lastId,
                'title': title,
                comments: []
            }
            $scope.items.push(newTopic);
            saveToLocalStorage();
            $scope.topic = title;
            $scope.topicTitle = '';
            var inpt = document.getElementById('text');
            inpt.value = '';
            $location.path('/');
          }   
        }
        
        function getPostById(id) {
            function checkId(item) {
                if (item.id == id) {
                    return true;
                }
                return false;
            }
            return $scope.items.find(checkId);
        }
        
        $scope.getNewComment = "";
        
        $scope.addNewComment = function(id,comment){
            if(comment.trim().length > 0){ 
                let item = getPostById(id);
                objComment = {text: comment, color: randomColor()};
                item.comments.push(objComment);
                saveToLocalStorage();
                $scope.getNewComment = "";
                var inpt = document.getElementById('text');
                inpt.value = '';
            }
        }
        
        $scope.deleteTopic = function(id){
            confirm('Are you sure? Do you want to delete this topic?');
            // TODO: delete from array here
            let item = getPostById(id);
            let itemIndex = $scope.items.indexOf(item);
            $scope.items.splice(itemIndex, 1);
            saveToLocalStorage();
        }
        
    });

