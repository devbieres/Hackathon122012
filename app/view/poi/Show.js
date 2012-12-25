Ext.define("LaCarteTouch.view.poi.Show", {
   extend: "Ext.Panel",
   xtype: "poishow",

   requires: [
        "LaCarteTouch.view.poi.Info", "LaCarteTouch.view.poi.Directions",
        "Ext.Label", "Ext.Map",
   ],

   config: {
      title: "Détail",
      layout: "card",
      record: null,
      autoDestroy: true,
      items: [
                {
                    title:"Carte", xtype:"mapleaf", id:"poimap" 
                },
                {
                    title:"Infos", xtype:"poiinfo", id:"poiinfo" 
                }, 
                {
                    title:"Directions", xtype:"poidirection", id:"poidirection"
                }
      ], // items 
   }, // fin de config

});
