Ext.define("LaCarteTouch.view.poi.Show", {
   extend: "Ext.Panel",
   xtype: "poishow",

   requires: [
        "LaCarteTouch.view.poi.Info",
        "Ext.Label", "Ext.Map",
   ],

   config: {
      title: "",
      layout: "fit",
      record: null,
      items: [
         {
            xtype: 'label', id:"poititle", docked:"top"
         },
         {
            xtype: 'tabpanel', 
            tabBar: { 
                 docked:'top', 
            },
            items : [
                {
                    title:"Infos", xtype:"poiinfo", id:"poiinfo",
                },
                {
                    title:"Carte", xtype:"map", id:"poimap", mapOptions: { zoom: 15 }
                }
            ], // items du tabpanel
         }
      ], // items 
   }, // fin de config

});
