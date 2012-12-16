Ext.define("LaCarteTouch.view.poi.Navigation", {
   extend:"Ext.navigation.View",   
   xtype: "poinavigation",

  requires: [
       "LaCarteTouch.view.poi.List",
       "LaCarteTouch.view.poi.Show",
  ],

   config: {
      autoDestroy: false,
      navigationBar: { hidden: false  },
      //navigationBar: {
          //items: [
          //   {
          //       xtype:'button', id:'refreshButton', text:'', align:'right', iconCls:'refresh', iconMask:'true',
          //   },
          //   {                 
          //       xtype:'button', id:'favoriButton', text:'', align:'right', iconCls:'favorites', iconMask:'true', hidden:true, ui:'plain',
          //   }                 
         //] // navigationBar.items        
      //}, // navigationBar
      items: [
         { xtype: "poilist", grouped: true }
      ] // items
  } // config
      
}); // class

