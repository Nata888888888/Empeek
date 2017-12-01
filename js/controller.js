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
                comments: [{text: "It is along established fact that a reader will be distracted by the readable content of a page when looking at its layot. The point of using Lorem Ipsum is that has a more-or-less normal distribution of letters? as opposed to using 'Content here, content Here', making it look like readable English.", color: "red"}, 
                           {text: "It is along established fact that a reader will be distracted by the readable content of a page when looking at its layot.'", color: "green"}]
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
        $scope.topicTitle='';
        $scope.topic='';
        
        $scope.addTopic = function(title){
            $scope.lastId++;
            $scope.topic = '';
          if(title.length > 0){  
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
            if(comment.length > 0){ 
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
            saveToLocalStorage();
        }
        
    });

