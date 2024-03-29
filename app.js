//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'LaCarteTouch': 'app',
});
//</debug>

Ext.application({
    name: 'LaCarteTouch',

    requires: [
        'Ext.MessageBox', 'Ext.field.Search', 'Ext.data.proxy.LocalStorage','Ext.tab.Panel', 'Ext.device.Geolocation',
        'LaCarteTouch.util.UtilMap', 'LaCarteTouch.util.UtilLeaflet',
        'LaCarteTouch.view.Main',
    ],


    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    models: ["POI","Config", "Type", "Theme", "Direction", "About"],
    stores: ["POIS", "Config", "Type", "Theme", "Direction", "About"],
    controllers: ["Main", "Search", "Map", "Direction"],
    views: [
          "poi.Navigation",
       ],

    launch: function() {

        // Initialize the main view
        Ext.Viewport.add(Ext.create('LaCarteTouch.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
