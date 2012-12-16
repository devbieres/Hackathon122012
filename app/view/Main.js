Ext.define('LaCarteTouch.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar', 'Ext.field.Select',
    ],
    config: {
        title:"",
        layout:"fit",

        items: [
            {
               xtype:'toolbar',
               ui: 'light',
               docked:'bottom',
               items: [
                   { xtype : 'spacer', },
                   {
                      xtype: 'selectfield',
                      id:'typeSelect',
                      name:'typeSelect',
                      store: 'Type',
                      displayField: 'nom',
                      valueField: 'code',
                   },
                   {
                     xtype:'selectfield',
                     id:'distanceSelect',
                     name:'options',
                     options: [
                             { text: '1 km', value:'1' },
                             { text: '5 km', value:'5' },
                             { text: '15 km', value:'15' },
                             { text: '30 km', value:'30' },
                             { text: '50 km', value:'50' },
                     ],
                   },
                  { xtype : 'spacer', },
              ], // items
            },
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
