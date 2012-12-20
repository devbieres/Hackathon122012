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
         marker:"",
         mapButton:"#mapButton",
         infoButton:"#infoButton",
         
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
         infoButton: { tap: "onInfoButtonTap" }
      }
   }, // fin de config

   // Gestion d'un changement d'actif item 
   onMainActiveItemChange: function(scope, value, oldValue, eOpts) {
        console.log(value.xtype);
        if(value.xtype=='searchresult') {
           console.log('back on search result !');
           this.getNav().reset();
           //this.getNav().setActiveItem(0);
           //if(this.poishow != null) {
           //    this.getPoiShow().setActiveItem(0);
           //}
        }
   }, // fin onMainActiveItemChange

   // Gestion d'un push
   onNavPush : function(view, item) {
       if(item.getActiveItem().xtype == 'map') {
          this.getMapButton().show();
          this.getInfoButton().hide();
       } else {
          this.getMapButton().hide();
          this.getInfoButton().show();
       }
   }, // fin de la gestion du push

   // Gestion du pop
   onNavPop : function(view, item) {
       this.getMapButton().hide();
       this.getInfoButton().hide();
   }, // fin de la gestion du pop
   

   // Gestion du bouton Map
   onMapButtonTap: function() {
        this.getPoiShow().setActiveItem(1);
        this.getMapButton().hide();
        this.getInfoButton().show();
   },

   // Gestion du bouton Info
   onInfoButtonTap: function() {
        this.getPoiShow().setActiveItem(0);
        this.getMapButton().show();
        this.getInfoButton().hide();
   },


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
             icon: './resources/images/' + record.get('type') + '/' + record.get('distanceClass')  + '.png',
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
