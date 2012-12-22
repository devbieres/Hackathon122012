Ext.define("LaCarteTouch.view.list.SearchResult", {
   extend:"Ext.navigation.View",   
   xtype: "searchresult",

  requires: [
       "Ext.data.JsonP", "Ext.form.Panel", "Ext.field.Select", "Ext.field.Slider",
       "LaCarteTouch.view.poi.List",
       "LaCarteTouch.view.poi.Show"
   ],

   config: {
      title: 'Liste',
      iconCls: 'list',
      autoDestroy: false,
      navigationBar: {
          items: [
             {
                 xtype:'button', id:'mapButton', text:'', align:'right', iconCls:'info', iconMask:'true', hidden:true, ui:'confirm',
             },
             {                 
                 xtype:'button', id:'infoButton', text:'', align:'right', iconCls:'globe2', iconMask:'true', hidden:true, ui:'confirm',
             }                 
         ] // navigationBar.items        
      }, // navigationBar
      items: [
         { xtype: "poilist", grouped: true, id:'poilist' },
         //{ xtype: 'poishow', id:'poishow' }
      ] // items
  } // config
      
}); // class

