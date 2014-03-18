/**
 * @module Editor
 */
module Editor {

    export function TodoCtrl($scope) {
        $scope.todos = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}];

        $scope.addTodo = function() {
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = '';
        };

        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        $scope.archive = function() {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) $scope.todos.push(todo);
            });
        };
    }

    export function RenderCtrl(asciidocOpts) {

        var app = this;
        app.asciidocOpts = asciidocOpts;

        app.ascii= '== Write some text or drop an AsciiDoc file in editor area\n';
        app.ascii+= '= <-';

        /**
         * Define Post processor to change html generated with asciidoc
         * @param  {angular.element} element [description]
         * @return {html} html updated
         */
        var urlImages = 'https://raw2.github.com/asciidoctor/asciidoctor.js/master/examples/';
        var urlLink = 'https://github.com/Nikku/asciidoc-samples/blob/master/';

        app.asciiPostProcessor = function(element) {
            element.find('a').not('[href^="http"]').each(function() {
                var el = angular.element(this)
                var href = el.attr('href');
                el.attr('href', urlLink+href)
            });

            element.find('img').not('[src^="http"]').each(function() {
                var el = angular.element(this);
                var srcImg = el.attr('src');
                el.attr('src',  urlImages+srcImg);
            });

            return element;
        }

        // The ui-ace option
        app.aceOption = {
            theme:'terminal',
            mode: 'asciidoc'
        }



        app.onDragOver = function(event) {
            console.log(event);
        };

        app.onDragEnter = function(event) {
            console.log(event);
        };

        app.onDragLeave = function(event) {
            console.log(event);
        };
    }


}

