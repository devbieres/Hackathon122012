Ext.define("LaCarteTouch.view.poi.Show", {
   extend: "Ext.Panel",
   xtype: "poishow",

   requires: [
        "LaCarteTouch.view.poi.Info",
        "Ext.Label", "Ext.Map",
   ],

   config: {
      title: "",
      layout: "vbox",
      record: null,
      items: [
                {
                    title:"Infos", xtype:"poiinfo", id:"poiinfo", flex:1
                },
                {
                    title:"Carte", xtype:"map", id:"poimap", mapOptions: { zoom: 15 }, flex:2
                }
      ], // items 
   }, // fin de config

});
