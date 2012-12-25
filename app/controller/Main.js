Ext.define("LaCarteTouch.controller.Main", {
   extend: "LaCarteTouch.controller.Base",

   // config
   config: {
      refs: { 
         main: "main",
         nav: "searchresult",
         poiList:"poilist",
         poiShow:"poishow",
         poiInfo:"poiinfo",
         poiMap:"#poimap",
         poiDirection:"#poidirection",
         marker:"",
         markerOrigin:"",
         polyline:"",
         mapButton:"#mapButton",
         infoButton:"#infoButton",
         directionButton:"#directionButton",
         record: null
      },
      control: {
         main: {
            activeitemchange: "onMainActiveItemChange", 
         },
         nav : {
            push: "onNavPush",
            pop: "onNavPop"
         },
         poiList: {
            itemtap: "onSearchTap"
         },
         mapButton: { tap: "onMapButtonTap"  },
         infoButton: { tap: "onInfoButtonTap" },
         directionButton: { tap: "onDirectionButtonTap" },
         poiMap: {
             rendered: "onMapRender"
         }
      }
   }, // fin de config

   // Gestion d'un changement d'actif item 
   onMainActiveItemChange: function(scope, value, oldValue, eOpts) {
        if(value.xtype=='searchresult') {
           this.getNav().reset();
        }
   }, // fin onMainActiveItemChange

   // Gestion d'un push
   onNavPush : function(view, item) {
       this.handleNavigationButton(item.getActiveItem().xtype);
   }, // fin de la gestion du push

   // Gestion des boutons
   handleNavigationButton : function(panel) {
       if(panel == 'mapleaf') {
          this.getMapButton().hide();
          this.getInfoButton().show();
          this.getDirectionButton().show();
       } else if(panel == 'poiinfo') {
          this.getMapButton().show();
          this.getInfoButton().hide();
          this.getDirectionButton().show();
       } else {
          this.getMapButton().show();
          this.getInfoButton().show();
          this.getDirectionButton().hide();
       }
   },

   // Gestion du pop
   onNavPop : function(view, item) {
       this.getMapButton().hide();
       this.getInfoButton().hide();
       this.getDirectionButton().hide();
   }, // fin de la gestion du pop
   

   // Gestion du bouton Map
   onMapButtonTap: function() {
        this.getPoiShow().setActiveItem(0);
        this.handleNavigationButton('mapleaf');
   },

   // Gestion du bouton Info
   onInfoButtonTap: function() {
        this.getPoiShow().setActiveItem(1);
        this.handleNavigationButton('poiinfo');
   },

   // Gestion du bouton Direction
   onDirectionButtonTap: function() {
        this.getPoiShow().setActiveItem(2);
        this.handleNavigationButton('poidirection');
   },


   // Tap sur la liste d'une recherche
   onSearchTap: function(list, index, node, record) {
      this.record = record;

      // Poi Show ?
      if(! this.poiShow) { this.poiShow = Ext.create("LaCarteTouch.view.poi.Show");  }
 
      // Affectation des données
      this.getPoiShow().setRecord(record);
      this.getPoiInfo().setData(record.data);
      this.getPoiDirection().setRecord(record);

      // Filtre du store de direction
      var s = this.getDirectionStore();
      s.clearFilter(true);
      s.filter(function(d) { 
                return d.get('poiid') == record.get('id'); 
           });

      // Gestion de la carte
      if(this.getPoiMap().getIsRendered() == 1) {
            this.gererLaCarte(record);
      } // Fin de la gestion de la carte

      // Affichage de la liste
      this.getNav().push(this.getPoiShow());
      
   }, // onSearchTap

   // Quand la carte est affichée
   onMapRender: function() {
      if(this.record) {
           this.gererLaCarte(this.record);
      }
   },

   // Centralise la mise à jour de la carte
   gererLaCarte: function(r) {

       var map = this.getPoiMap();

      // Origine 
      var cfg = this.getConfig();
      var lat = cfg.get('latitude');
      var lng = cfg.get('longitude');
      if(typeof this.markerOrigin != 'undefined') { map.removeMarker(this.markerOrigin); this.markerOrigin = null; }
      this.markerOrigin = map.addMarker(lat, lng, './resources/images/position.png');

       // Destination
       map.setMapCenter(r.get('latitude'), r.get('longitude'));
       if(typeof this.marker != 'undefined') { map.removeMarker(this.marker); this.marker = null; }
       this.marker =  map.addMarker(r.get('latitude'), r.get('longitude'), './resources/images/' + r.get('type') + '/default.png');

       // Calcul d'un trace
       if(typeof this.polyline != 'undefined') { map.removePolyline(this.polyline); this.polyline = null; }
       var arr = new Array();
       this.getDirectionStore().each(function (item, index, length) { 
                if(typeof item.get('lat') != 'undefined') { arr.push(map.getLatLng(item.get('lat'), item.get('lng'))) }; 
       });
       if(arr.length > 0) {
           this.polyline = map.drawPolyline(arr);
       }

   }, // fin de gérer la carte
 
});
