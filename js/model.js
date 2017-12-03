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
                    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    color: "red"
                }, {
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
                    text: 'Lorem ipsum',
                    color: "blue"
                }],
            });
            data.topicLastId = 3;
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
            var topic = getTopicById(topicId);
            newComment = {
                text: comment,
                color: randomColor()
            };
            topic.comments.push(newComment);
            save();

            return newComment;
        }
    
        function deleteComment(topicId, commentId) {
            var topic = getTopicById(id);
            // TODO
        }

        return {
            topics: data.topics,
            addTopic: addTopic,
            deleteTopic: deleteTopic,
            addComment: addComment,
            deleteComment: deleteComment
        };
    });