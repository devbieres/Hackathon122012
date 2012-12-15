Ext.define("LaCarteTouch.controller.Main", {
   extend: "Ext.app.Controller",

   // config
   config: {
      refs: { 
         nav: "poinavigation",
         poiList:"poilist",
         poiShow:"poishow",
         poiInfo:"poiinfo",
         poiMap:"#poimap"
      },
      control: {
         poiList: {
            itemtap: "onSearchTap"
         },
         poiMap: {
            activate: "onMapActivate",
            //deactivate: "onMapDeactivate",
         },
      }
   }, // fin de config

   getConfigStore: function() { return Ext.getStore("Config"); },

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

   // lauch !
   launch: function() {
         // Gestion d'un premier accès à la config
         var config = this.getConfig();

         // Gestion de la localisation
         var geo = Ext.create("Ext.util.Geolocation", 
                 {
                    autoUpdate: false,
                    listeners: {
                       locationupdate: function(geo) { 
                              //console.log(geo); 
                              var store = Ext.getStore("Config");
                              var cfg = store.getAt(0); 
                              cfg.set('latitude', geo.getLatitude());
                              cfg.set('longitude', geo.getLongitude());
                              //console.log(cfg);
                              store.sync();
                       },
                     } // listeners
                 }); // geo
   },

   // Activation de la carte
   onMapActivate: function() {
        var cfg = this.getConfig();
        this.getPoiMap().setMapCenter( { latitude: cfg.get('latitude'), longitude: cfg.get('longitude') } );
   }, // Activation de la carte

   // Tap sur la liste d'une recherche
   onSearchTap: function(list, index, node, record) {
      //console.log(record);

      // Poi Show ?
      if(! this.poiShow) { this.poiShow = Ext.create("LaCarteTouch.view.poi.Show");  }
 
      // Affectation des données
      this.getPoiShow().setRecord(record);
      this.getPoiInfo().setData(record.data);

      // Gestion de la carte
      var map = this.getPoiMap().getMap(); //console.log(map);
      console.log(record.get('latitude'));
      console.log(record.get('longitude'));
      this.getPoiMap().setMapCenter( { latitude: record.get('latitude'), longitude: record.get('longitude')  } );

      // Affichage de la liste
      this.getNav().push(this.getPoiShow());
      
   }, // onSearchTap

});
