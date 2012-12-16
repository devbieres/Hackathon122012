Ext.define("LaCarteTouch.view.poi.Show", {
   extend: "Ext.Panel",
   xtype: "poishow",

   requires: [
        "LaCarteTouch.view.poi.Info",
        "Ext.Label", "Ext.Map",
   ],

   config: {
      title: "Détail",
      layout: "fit",
      record: null,
      items: [
                {
                    title:"Infos", xtype:"poiinfo", id:"poiinfo", dock:'top' 
                },
                {
                    title:"Carte", xtype:"map", id:"poimap", mapOptions: { zoom: 15 }
                }
      ], // items 
   }, // fin de config

});
