Ext.define("LaCarteTouch.controller.Base", {
   extend: "Ext.app.Controller",

   getConfigStore: function() { return Ext.getStore("Config"); },
   getPOIStore: function() { return Ext.getStore("POIS"); },

   // Recuperation de la config
   getConfig : function() {
       // -1-
       var store = this.getConfigStore();

       // -2- 
       var count = store.getCount();
       if(count == 0) {
          var cfgItem = Ext.create("LaCarteTouch.model.Config",
                            {
                               code : "lacarte-config",
                               distance: 30,
                               latitude: 47.217316595885734,
                               longitude: -1.5465397033691520  
                            }
                        );
          store.add(cfgItem);
          store.sync();
       } // fin de -2-

       // -3-
       var obj = store.getAt(0);
       //console.log(obj);
       return obj;

   }, // getConfig


});
