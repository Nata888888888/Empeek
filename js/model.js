angular.module('sayerApp').factory('sayerModel',
    function() {
        var LS_ITEM_NAME = "sayerData";

        var data = {};
        data.topics = [];
        data.topicLastId = 0;

        function save() {
            var json = angular.toJson(data);

            localStorage.setItem(LS_ITEM_NAME, json);
        }

        function load() {
            var json = localStorage.getItem(LS_ITEM_NAME);

            if (!json)
                return null;

            data = angular.fromJson(json);
            return data;
        }

        if (!load()) {
            data.topics.push({
                id: "1",
                title: 'First item with customized long title',
                comments: [{
                    id: "1",
                    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    color: "red"
                }, {
                    id: "2",
                    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
                    color: "green"
                }]
            }, {
                id: "2",
                title: 'Second item',
                comments: []
            }, {
                id: "3",
                title: 'Third item (short one)',
                comments: [{
                    id: "3",
                    text: 'Lorem ipsum',
                    color: "blue"
                }],
            });
            data.topicLastId = 3;
            //
            data.commentsLastId = 3;
            //
            save();
        }
        
        function getTopicById(id) {
            return data.topics.find(function(topic) {
                return topic.id == id;
            });
        }
    
        function addTopic(topicTitle) {
            data.topicLastId++;
            var newTopic = {
                id: data.topicLastId,
                title: topicTitle,
                comments: []
            }
            data.topics.push(newTopic);
            save();

            return newTopic;
        }

        function deleteTopic(topicId) {
            var topic = getTopicById(topicId);
            var topicIndex = data.topics.indexOf(topic);
            data.topics.splice(topicIndex, 1);
            save();
        }

        function addComment(topicId, comment) {
            data.commentsLastId++;
            var topic = getTopicById(topicId);
            newComment = {
                id: data.commentsLastId,
                text: comment,
                color: randomColor()
            };
            topic.comments.push(newComment);
            save();

            return newComment;
        }
    
        function deleteComment(topicId, commentId) {
//            var comment = getCommentById(topicId, commentId);
            var topic = getTopicById(topicId);
            var comment = topic.comments;
            
            function indexOfComment(){
                for (var i=0; i<comment.length; i++){
                    if(comment[i].id == commentId){
                        return i;
                    }
                }
            }
            comment.splice(indexOfComment(), 1);
            save();
        }
    
        function toEditComment(topicId, commentId) {
            var topic = getTopicById(topicId);
            var comment = topic.comments;
            
            function indexOfComment1(){
                for (var i=0; i<comment.length; i++){
                    if(comment[i].id == commentId){
                        return i;
                    }
                }
            }
             return comment[indexOfComment1()].text;
            
        }
        function editComment(topicId, comment, commentId){
               var topic = getTopicById(topicId);
            var comment1 = topic.comments;
    
            function indexOfComment2(){
                for (var i=0; i<comment1.length; i++){
                    if(comment1[i].id == commentId){
                        return i;
                    }
                }
            }
            return comment1[indexOfComment2()].text = comment;
        }
        

        return {
            topics: data.topics,
            addTopic: addTopic,
            deleteTopic: deleteTopic,
            addComment: addComment,
            deleteComment: deleteComment,
            toEditComment: toEditComment,
            editComment: editComment
        };
    });