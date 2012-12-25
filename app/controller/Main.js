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
      console.log('Push du record !');
      this.getPoiDirection().setRecord(record);

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
   gererLaCarte: function(record) {
       console.log(record.get('latitude') + ' ' + record.get('longitude'));
       this.getPoiMap().setMapCenter(record.get('latitude'), record.get('longitude'));
       if(typeof this.marker != 'undefined') { this.getPoiMap().removeMarker(this.marker); this.marker = null; }
       this.marker =  this.getPoiMap().addMarker(record.get('latitude'), record.get('longitude'), './resources/images/' + record.get('type') + '/default.png');
   }, // fin de gérer la carte
 
});
