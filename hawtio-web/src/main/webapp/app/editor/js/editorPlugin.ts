/**
 * @module Editor
 * @main Editor
 */
module Editor {

    var pluginName = 'editor';
    var base_url = 'app/editor/html/';

    angular.module(pluginName, ['bootstrap', 'ngResource', 'hawtioCore', 'ui',  'ui.ace', 'ui.bootstrap', 'aql.asciidoc', 'aql.directives.dropfile'])

        // Define Opal attributes and options
        //.constant('asciidocOpts', Opal.hash2(['options'], {'header_footer': true}))

        .config(($routeProvider) => {
            $routeProvider.
                when('/editor', {templateUrl: base_url + 'editor.html'}).
                when('/editor/demo', {templateUrl: base_url + 'demo.html'});
        })

        .run(($location:ng.ILocationService, workspace:Workspace, viewRegistry, layoutFull, helpRegistry) => {

        viewRegistry[pluginName] = 'app/editor/html/editor.html';
        helpRegistry.addUserDoc(pluginName, 'app/editor/doc/help.md', () => {
            return false;
        });

/*        // Set up top-level link to our plugin
        workspace.topLevelTabs.push({
            id: "editor",
            content: "Editor",
            title: "Ace Editor",
            href: () => '#/editor',
            //isActive: (workspace:Workspace) => workspace.isLinkActive("editor")
            //isValid: (workspace:Workspace) => workspace.treeContainsDomainAndProperties(jmxDomain, {type: mbeanType}),
            isValid: (workspace) => true,
            isActive: (workspace:Workspace) => workspace.isTopTabActive("editor")
        });*/

    });

    hawtioPluginLoader.addModule(pluginName);
}
