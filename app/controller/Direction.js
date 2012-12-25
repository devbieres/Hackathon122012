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
         poiMap:          "#poimap",
         record:          null
       }, // fin des refs
       control: {
          btnCalculer:  {
              tap: 'onBtnCalculerTap'
         },
       }
   }, // config


   // Gestion du bouton de recherche
   onBtnCalculerTap: function() {

      // Mise en attente
      var main = this.getMain();
      main.setMasked({ xtype:'loadmask', message:'Chargement' });
      var poimap = this.getPoiMap();
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
              var l = result.route.legs[0];
              if(typeof l != 'undefined') {
                 // Creation d'une ligne d'avertissement
                 var now = new Date();
                 var item = Ext.create("LaCarteTouch.model.Direction",
                       {
                            id: (now.getTime()).toString() + ( Math.floor(Math.random() * (100 - 0 + 1)) + 0).toString(),
                            poiid : record.get('id'),
                            index : 0, direction:10, distance:0,
                            info  : "Les indications sont <b>informatives</b>. Respectez le <b>code de la route</b> et votre <b>bon sens</b>."
                        });
                 store.add(item);
 
 
                 for(var i in l.maneuvers) {
                    var r = l.maneuvers[i];
                    now = new Date();
                    var item = Ext.create("LaCarteTouch.model.Direction",
                         {
                            id: (now.getTime()).toString() + ( Math.floor(Math.random() * (100 - 0 + 1)) + 0).toString(),
                            poiid : record.get('id'),
                            index : r.index + 1,
                            info  : r.narrative,
                            distance: r.distance,
                            direction: r.direction,
                            lat : r.startPoint.lat,
                            lng : r.startPoint.lng 
                         });
                    store.add(item);
                 } // fin du for
              } else {
                    var now = new Date();
                    var item = Ext.create("LaCarteTouch.model.Direction", {
                             id: (now.getTime()).toString() + ( Math.floor(Math.random() * (100 - 0 + 1)) + 0).toString(),
                             poiid : record.get('id'),
                             index : 1,
                             info: 'Aucune route trouvée ...',
                             distance :  0,
                             direction: 0
                            });
                    store.add(item);

              }
              poimap.fireEvent("rendered");
              main.setMasked(false);
          }
      });

 

   }

});
