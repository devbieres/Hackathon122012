Ext.define("LaCarteTouch.controller.Map", {
   extend: "LaCarteTouch.controller.Base",

   // config
   config: {
      refs: { 
        main: "main",
        mapPanel: 'mappanel',  
        map : '#situationMap',
        btn: "#btnSearch",
        btnMap: "#btnSearchMap",
        marker: null,
        geoloc : 0
      },
      control: {
         main: {
            activeitemchange: "onMainActiveItemChange",
         },
         map: { rendered: "onMapRender", mapClick:'onMapClick' },
         situationMap: 
          {
             activate: "onMapActivate",
          }, // mapPanel
         btnMap: 
            { 
              tap: "onSearch" 
            } 
      } // control
   },

   // Lance la recherche
   onSearch: function() {
       this.getBtn().fireEvent('tap');
   },

   // onMapClick
   // Gestion d'un click sur la carte
   onMapClick: function(lat, lng) {
       this.recordPosition(lat, lng, 1);
   },

   // onMapRender
   // La carte ne peyt être manipulé que si elle est a été "rendu"
   onMapRender: function() {
       this.onMapActivate(); 
   }, // rendu de la carte


   // Gestion d'un changement d'actif item 
   onMainActiveItemChange: function(scope, value, oldValue, eOpts) {
        if((value.xtype=='mappanel') || (value.xtype=='mappanelL')) {
            this.onMapActivate(); 
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
                        this.recordPosition(c.latitude, c.longitude, 1);
                 },
                 scope:this
          }); // fin du passage par le device
         
   }, // launch

   // Enregistremnt de la position
   recordPosition : function(lat, lng, refresh) {
        var store = Ext.getStore("Config");
        var cfg = store.getAt(0); 

        cfg.set('latitude', lat);
        cfg.set('longitude', lng);

        store.sync();

        if(refresh == 1) {
           this.onMapActivate();
        }

   }, // recordPosition

   onMapActivate: function() {
        if(this.geoloc == 1) { 

            var me = this;

            var cfg = this.getConfig();
            var lat = cfg.get('latitude');
            var lng = cfg.get('longitude');

            // #############################
            // Carte Open Street Map
            // #############################
            // Centrage de la carte
            if(this.getMap().getIsRendered() == 1) {
               this.getMap().setMapCenter(lat, lng);
               if(typeof this.marker != 'undefined') { this.getMap().removeMarker(this.marker); this.marker = null; }
               this.marker = this.getMap().addMarker(lat, lng, './resources/images/position.png');
               if(this.marker) {
                    this.marker.addEventListener('dragend', function(e) {
                        var m = e.target.getLatLng();
                       this.onMapClick(m.lat, m.lng)
                    }, this);
               }
            }

        } // fin == 1
        
   }, // onMapActivate

});
