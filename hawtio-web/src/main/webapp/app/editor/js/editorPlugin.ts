/**
 * @module Editor
 * @main Editor
 */
module Editor {

    var pluginName = 'editor';
    var base_url = 'app/editor/html/';

    angular.module(pluginName, ['bootstrap', 'ngResource', 'hawtioCore', 'ui', 'aql.asciidoc', 'ui.ace', 'aql.directives.dropfile'])

        // Define Opal attributes and options
        .constant('asciidocOpts', Opal.hash2(['options'], {'header_footer': true}))

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/editor', {templateUrl: base_url + 'index.html'})
                .when('/editor/demo', {templateUrl: base_url + 'demo.html'})
        }])

        .run(($location:ng.ILocationService, workspace:Workspace, viewRegistry, layoutFull, helpRegistry) => {

            // Use Full Layout of Hawtio
            viewRegistry[pluginName] = layoutFull;
            helpRegistry.addUserDoc(pluginName, 'app/editor/doc/help.md', () => {
                return false;
            });

            // Set up top-level link to our plugin
            workspace.topLevelTabs.push({
                id:         "editor",
                content:    "Editor",
                title:      "Ace Editor",
                href: () => '#/editor',
                //isActive: (workspace:Workspace) => workspace.isLinkActive("editor")
                //isValid: (workspace:Workspace) => workspace.treeContainsDomainAndProperties(jmxDomain, {type: mbeanType}),
                isValid: (workspace) => true,
                isActive: (workspace:Workspace) => workspace.isTopTabActive("editor")
            });

        });

    hawtioPluginLoader.addModule(pluginName);
}
