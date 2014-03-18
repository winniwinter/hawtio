/**
 * @module Editor
 */
module Editor {

    export function RenderCtrl($scope) {

        // The Themes
        $scope.themes = ['chrome', 'twilight', 'terminal', 'solarized_dark', 'solarized_light','textmate'];
        $scope.theme = $scope.themes[3];

        /**
         * Define Post processor to change html generated with asciidoc
         * @param  {angular.element} element [description]
         * @return {html} html updated
         */
        var urlImages = 'https://raw2.github.com/asciidoctor/asciidoctor.js/master/examples/';
        var urlLink = 'https://github.com/Nikku/asciidoc-samples/blob/master/';

        $scope.asciiPostProcessor = function(element) {
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
        $scope.aceOption = {
            mode:     'XLLLLL',
            theme:    $scope.theme.toLowerCase(),
            onLoad: function (_ace) {
                $scope.themeChanged = function () {
                    _ace.setTheme('ace/theme/' + $scope.theme.toLowerCase());
                };
            }
        };

        $scope.ascii=  '== Write some text or drop an AsciiDoc file in editor area\n';
        $scope.ascii+= '== <-';

    }

    export function AceCtrl($scope) {

        // The modes
        $scope.modes = ['Scheme', 'XML', 'Javascript'];
        $scope.mode = $scope.modes[0];


        // The ui-ace option
        $scope.aceOption = {
            mode: $scope.mode.toLowerCase(),
            onLoad: function (_ace) {

                // HACK to have the ace instance in the scope...
                $scope.modeChanged = function () {
                    _ace.getSession().setMode("ace/mode/" + $scope.mode.toLowerCase());
                };

            }
        };

        // Initial code content...
        $scope.aceModel = ';; Scheme code in here.\n' +
            '(define (double x)\n\t(* x x))\n\n\n' +
            '<!-- XML code in here. -->\n' +
            '<root>\n\t<foo>\n\t</foo>\n\t<bar/>\n</root>\n\n\n' +
            '// Javascript code in here.\n' +
            'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}';

    }


}

