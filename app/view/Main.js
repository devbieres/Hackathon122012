Ext.define('LaCarteTouch.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
    ],
    config: {
        title:"",
        layout:"fit",

        items: [
            {
               xtype:'searchfield',
               name:'search',
               id:'search',
               placeHolder: 'Piscine, Musée, ...',
               docked:'bottom'
            }, 
            {
               xtype:'poinavigation',
            }
        ] // items
    }
});
