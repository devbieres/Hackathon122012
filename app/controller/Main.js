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
         //this.getDistanceSelect().setValue(config.get('distance'));

         // Gestion de la localisation
         var geo = Ext.create("Ext.util.Geolocation", 
                 {
                    autoUpdate: false,
                    listeners: {
                       locationupdate: function(geo) { 
                              var store = Ext.getStore("Config");
                              var cfg = store.getAt(0); 
                              cfg.set('latitude', geo.getLatitude());
                              cfg.set('longitude', geo.getLongitude());
                              console.log('location update :' + cfg.get('latitude') + ' - ' +  cfg.get('longitude'))
                              store.sync();
                       },
                     } // listeners
                 }); // geo
          geo.updateLocation(); 

          // Via le device
          console.log(Ext.feature.has.Geolocation);
          
          Ext.device.Geolocation.getCurrentPosition({
                 success: function(position) {
                        var c = position.coords;
                        console.log(' Device : ' + c.latitude + ' ' + c.longitude);
                 }
          });
          
         
   },

   // Activation de la carte
   onMapActivate: function() {
        var cfg = this.getConfig();
        console.log('onMapActivate :' + cfg.get('latitude') + ' - ' +  cfg.set('longitude'))
        this.getPoiMap().setMapCenter( { latitude: cfg.get('latitude'), longitude: cfg.get('longitude') } );
   }, // Activation de la carte

   // Tap sur la liste d'une recherche
   onSearchTap: function(list, index, node, record) {

      // Poi Show ?
      if(! this.poiShow) { this.poiShow = Ext.create("LaCarteTouch.view.poi.Show");  }
 
      // Affectation des données
      this.getPoiShow().setRecord(record);
      this.getPoiInfo().setData(record.data);

      // Gestion de la carte
      var map = this.getPoiMap().getMap(); //console.log(map);
      this.getPoiMap().setMapCenter( { latitude: record.get('latitude'), longitude: record.get('longitude')  } );

      // Creation d'un marker
      var latlngM = new google.maps.LatLng(record.get('latitude'), record.get('longitude'));
      var marker = new google.maps.Marker({
             icon: './resources/images/' + record.get('type') + record.get('distanceClass')  + '.png',
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
