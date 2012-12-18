Ext.define('LaCarteTouch.view.Main', {
    extend: 'Ext.TabPanel',
    xtype: 'main',

    requires: [
        "LaCarteTouch.view.form.Search", "LaCarteTouch.view.list.SearchResult"
    ],

    config: {
        tabBar: { docked: 'bottom'},
        fullscreen: true,
        items: [
           {
              xtype:'searchform',
           },
           {
             xtype:'searchresult'
           }
        ],
    }
});
