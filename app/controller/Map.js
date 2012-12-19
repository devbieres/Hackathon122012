Ext.define("LaCarteTouch.controller.Map", {
   extend: "LaCarteTouch.controller.Base",

   // config
   config: {
      refs: { 
        mapPanel: 'mappanel',  
        situationMap : '#situationMap',
        btn: "#btnSearch",
        marker: null
      },
      control: {
        situationMap: 
          {
             activate: "onMapActivate"
          } // mapPanel
      } // control
   },

   // lauch !
   launch: function() {
         // Gestion d'un premier accès à la config
         var config = this.getConfig();
         
         // Passage par le device 
          Ext.device.Geolocation.getCurrentPosition({
                 success: function(position) {
                        var c = position.coords;
                        console.log(' Device : ' + c.latitude + ' ' + c.longitude);
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

         console.log('location update :' + cfg.get('latitude') + ' - ' +  cfg.get('longitude'))
         store.sync();

         this.onMapActivate();

   }, // recordPosition

   onMapActivate: function() {
        console.log('onMapActivate');
        var me = this;

        var cfg = this.getConfig();
        var lat = cfg.get('latitude');
        var lng = cfg.get('longitude');
        // Centrage de la carte
         
        console.log('OnMapActivate :' + lat + ' ' + lng);
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
                   console.log('Drag End');
                   me.recordPosition(
                          m.getPosition().lat(), 
                          m.getPosition().lng()
                   );
                   me.getBtn().fireEvent('tap');
            }
        );
        
   }, // onMapActivate

});
