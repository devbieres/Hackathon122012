Ext.define('LaCarteTouch.view.Main', {
    extend: 'Ext.TabPanel',
    xtype: 'main',
    id:'main',

    requires: [
        "LaCarteTouch.view.form.Search", "LaCarteTouch.view.list.SearchResult",
        "LaCarteTouch.view.map.Map",
    ], 

    config: {
        tabBar: { docked: 'bottom'},
        fullscreen: true,
        items: [
           {
              xtype:'searchform',
           },
           {
             xtype:'searchresult', id:'searchresult'
           },
           {
              xtype:'mappanel' 
           },
        ] // items
    } // config
});
