Ext.define("LaCarteTouch.controller.Map", {
   extend: "LaCarteTouch.controller.Base",

   // config
   config: {
      refs: { 
        main: "main",
        mapPanel: 'mappanel',  
        situationMap : '#situationMap',
        btn: "#btnSearch",
        marker: null,
        geoloc : 0
      },
      control: {
         main: {
            activeitemchange: "onMainActiveItemChange",
         },
        situationMap: 
          {
             activate: "onMapActivate"
          } // mapPanel
      } // control
   },

   // Gestion d'un changement d'actif item 
   onMainActiveItemChange: function(scope, value, oldValue, eOpts) {
        if(value.xtype=='mappanel') {
            // -1- Recherche de la config
            var cfg = this.getConfig();
            var lat = cfg.get('latitude');
            var lng = cfg.get('longitude');
            // -2- 
            this.recordPosition(lat, lng);
       }
   },
   // fin d'un changement d'actif item

   // lauch !
   launch: function() {
         // Gestion d'un premier accès à la config
         var config = this.getConfig();
         
         // Passage par le device 
          Ext.device.Geolocation.getCurrentPosition({
                 success: function(position) {
                        var c = position.coords;
                        this.geoloc = 1;
                        this.recordPosition(c.latitude, c.longitude);
                 },
                 scope:this
          }); // fin du passage par le device
         
   }, // launch

   // Enregistremnt de la position
   recordPosition : function(lat, lng) {
         var store = Ext.getStore("Config");
         var cfg = store.getAt(0); 

         cfg.set('latitude', lat);
         cfg.set('longitude', lng);
        this.getSituationMap().setMapCenter( { latitude: lat, longitude: lng } );

         store.sync();

         this.onMapActivate();

   }, // recordPosition

   onMapActivate: function() {
        if(this.geoloc == 1) { 

            var me = this;

            var cfg = this.getConfig();
            var lat = cfg.get('latitude');
            var lng = cfg.get('longitude');
            
            // Centrage de la carte
            this.getSituationMap().setMapCenter( { latitude: lat, longitude: lng } );
            // Creation d'un point
            var latlngM = new google.maps.LatLng(lat, lng);
            // Creation du marker
            var map = this.getSituationMap().getMap();
            if(typeof this.marker != 'undefined') { this.marker.setMap(null); this.marker = null; }
            else {
                google.maps.event.addListener(map, 'click', function(e) {
                    me.recordPosition(e.latLng.lat(), e.latLng.lng());
                    // Lever un event pour lancer la recherche ...
                    me.getBtn().fireEvent('tap');
                });
            }
            // 
            this.marker = new google.maps.Marker({
              icon: './resources/images/position.png',
              position: latlngM,
              map: map,
              title: 'Vous !',
              draggable: true,
            });

            // Gestion de l'event
            var m = this.marker;
            google.maps.event.addListener(m, 'dragend', 
                function() {
                   me.recordPosition(
                          m.getPosition().lat(), 
                          m.getPosition().lng()
                   );
                   me.getBtn().fireEvent('tap');
                }
           );
        } // fin == 1
        
   }, // onMapActivate

});
