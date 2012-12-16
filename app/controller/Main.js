Ext.define("LaCarteTouch.controller.Main", {
   extend: "LaCarteTouch.controller.Base",

   // config
   config: {
      refs: { 
         nav: "poinavigation",
         poiList:"poilist",
         poiShow:"poishow",
         poiInfo:"poiinfo",
         poiMap:"#poimap",
         marker:"",
         distanceSelect: "#distanceSelect",
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

   // lauch !
   launch: function() {
         // Gestion d'un premier accès à la config
         var config = this.getConfig();
         this.getDistanceSelect().setValue(config.get('distance'));

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

      // Creation d'un marker
      var latlngM = new google.maps.LatLng(record.get('latitude'), record.get('longitude'));
      var marker = new google.maps.Marker({
             position: latlngM,
             map: map,
             title: record.get('nom')
        });
      if(typeof this.marker != 'undefined') { this.marker.setMap(null); }
      this.marker = marker;

      // Affichage de la liste
      this.getNav().push(this.getPoiShow());
      
   }, // onSearchTap

});
