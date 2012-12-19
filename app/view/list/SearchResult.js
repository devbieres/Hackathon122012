Ext.define("LaCarteTouch.view.list.SearchResult", {
   extend:"Ext.navigation.View",   
   xtype: "searchresult",

  requires: [
       "LaCarteTouch.view.poi.List",
       "LaCarteTouch.view.poi.Show"
  ],

   config: {
      title: 'Liste',
      iconCls: 'bookmarks',
      autoDestroy: false,
      navigationBar: {
          items: [
             {
                 xtype:'button', id:'mapButton', text:'', align:'right', iconCls:'arrow_right', iconMask:'true', hidden:true, ui:'confirm',
             },
             {                 
                 xtype:'button', id:'infoButton', text:'', align:'right', iconCls:'arrow_left', iconMask:'true', hidden:true, ui:'confirm',
             }                 
         ] // navigationBar.items        
      }, // navigationBar
      items: [
         { xtype: "poilist", grouped: true, id:'poilist' },
         //{ xtype: 'poishow', id:'poishow' }
      ] // items
  } // config
      
}); // class

