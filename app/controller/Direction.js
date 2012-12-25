Ext.define("LaCarteTouch.controller.Direction", {
   extend: "LaCarteTouch.controller.Base",


   // Configuration
   config: {
       refs: {
         //typeSelect: "#typeSelect",
         main:            "#main",
         btnCalculer:     "#btnDirections",
         list:            "poilist",
         nav:             "searchresult",
         poiDirection:    "#poidirection",
         record:          null
       }, // fin des refs
       control: {
          btnCalculer:  {
              tap: 'onBtnCalculerTap'
         },
         nav : {
            push: "onNavPush",
         }
       }
   }, // config

   // Gestion d'un push
   onNavPush : function(view, item) {
      var record = this.getPoiDirection().getRecord();
       // Filtre du store direction sur le poi sélectionné
      var s = this.getDirectionStore();
      s.clearFilter(true);
      s.filter(function(d) { 
                //return true;
                return d.get('poiid') == record.get('id'); 
           });
   },

   // Gestion du bouton de recherche
   onBtnCalculerTap: function() {

      // Mise en attente
      var main = this.getMain();
      main.setMasked({ xtype:'loadmask', message:'Chargement' });
      // Destination
      var record = this.getPoiDirection().getRecord();
      var dlat = record.get('latitude');
      var dlng = record.get('longitude');

      // Origine
      var cfg = this.getConfig();
      var olat = cfg.get('latitude');
      var olng = cfg.get('longitude');

      var url = 'http://open.mapquestapi.com/directions/v1/route?outFormat=json&routeType=shortest&timeType=1&narrativeType=html&enhancedNarrative=false&shapeFormat=cmp&generalize=200&locale=fr_FR&unit=k&from=' + olat + ',' + olng  + '&to=' + dlat +',' + dlng + '&drivingStyle=2&highwayEfficiency=21.0';

      var store = this.getDirectionStore();

      Ext.data.JsonP.request({
          url: url,
          success: function(result) {
              var l = result.route.legs[0].maneuvers;
              for(var i in l) {
                 var now = new Date();
                 var r = l[i];
                 var item = Ext.create("LaCarteTouch.model.Direction",
                         {
                            id: (now.getTime()).toString() + ( Math.floor(Math.random() * (100 - 0 + 1)) + 0).toString(),
                            poiid : record.get('id'),
                            index : r.index,
                            info  : r.narrative,
                            distance: r.distance,
                            direction: r.direction,
                            lat : r.startPoint.lat,
                            lng : r.startPoint.lng 
                         });
                  console.log(item.get('info'));
                  store.add(item);
              } // fin du for
              main.setMasked(false);
          }
      });

 

   }

});
