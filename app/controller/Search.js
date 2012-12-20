Ext.define("LaCarteTouch.controller.Search", {
   extend: "LaCarteTouch.controller.Base",


   // Configuration
   config: {
       refs: {
         //typeSelect: "#typeSelect",
         main:            "#main",
         formThemeSelect: "#formThemeSelect",
         formTypeSelect:  "#formTypeSelect",
         formDistance:    "#formDistance",
         formCombien:     "#formCombien",
         formQuery:       "#formQuery",
         btnSearch:       "#btnSearch",
         list:            "poilist"
       }, // fin des refs
       control: {
          formThemeSelect: {
              change: 'onFormThemeSelect'
          },
          btnSearch:  {
              tap: 'onBtnSearchTap'
          }
       }
   }, // config

   launch: function() {
   },

   // onThemeChange
   onFormThemeSelect: function(scope, newValue, oldValue, eOpts) {
         // Application d'un filtre sur le store des types
         var store = this.getTypeStore();
         store.clearFilter(true);
         store.filter(function(type) { return type.get('theme') == newValue; });
   },

   onBtnSearchTap: function() {
         this.doSearch(this);
   },




   // Effectue la recherche
   doSearch: function(scope) {

      // -1- Récupération des différentes variables de recherche
      // --> IHM
      var theme = this.getFormThemeSelect().getValue();
      var type = this.getFormTypeSelect().getValue();
      var distance = this.getFormDistance().getValue();
      var combien = this.getFormCombien().getValue();
      var motscles = this.getFormQuery().getValue();
      if(motscles.length <= 0) { motscles = "*"; }

      // --> Config
      var config = this.getConfig();
      var lat = config.get('latitude');
      var lng = config.get('longitude');

      // -2- Génération de la requête
      var param = '{ "from" : 0, "size" : ' + combien +', "query" :  { "query_string" : {"query" : "' + motscles + '" } }, "filter" : {  "and" : [ {  "geo_distance" : { "distance" : "' + distance + '", "pin" : { "lat":' + lat +', "lon":' + lng +' } } }, { "term" : {  "theme": "' + theme + '" } }, { "term" : {  "type": "' + type + '" } } ]  }, "sort" : [ { "_geo_distance" : { "pin" : { "lat": ' + lat + ', "lon" : ' + lng + '  }, "order" : "asc", "unit" : "km" } } ] }';

      // -3- Récupération du store
      var store =  scope.getPOIStore();
      store.removeAll();
      // --> Mise en attente
      this.getMain().setMasked({
           xtype:'loadmask',
           message:'Chargement ...'
      });

      // -4- Calcul de l'url
      var url = "http://hack2012.logisima.com/hack2012/_search";

      // Chargement d'un JSON
      Ext.Ajax.request({
         url: url,
         method: 'POST',
         params:  param,
         success: function(result) {
              // -1- Recupération des infos distances
              var config = Ext.getStore('Config').getAt(0);
              var lat = config.get('latitude');
              var lng = config.get('longitude');

              // -2- Lecture
              var temp = Ext.JSON.decode(result.responseText);
              var hits = temp.hits.hits;

              // -3- Boucle
             for(var i in hits) {
                 var record = hits[i]._source;
                 var now = new Date();
                 var name = record.name;
                 var item = store.findRecord('nom', record.name);
                 if(item == null) {
                        item = Ext.create("LaCarteTouch.model.POI",
                           {
                            id: (now.getTime()).toString() + ( Math.floor(Math.random() * (100 - 0 + 1)) + 0).toString(),
                            nom: record.name,
                            adresse: record.adress,
                                  codepostal : record.cp,
                                  ville: record.city,
                                  mail: record.mail,
                                  telephone: record.tel,
                                  theme: record.theme,
                                  type: record.type,
                                  description : record.description,
                                  gestionnaire: record.gestionnaire,
                                  latitude: record.pin.lat,
                                  longitude: record.pin.lon,
                                  site: record.site,
                                });

                           // Calcul de distance
                           var dist = new Number(LaCarteTouch.util.UtilMap.distance(lat, lng, item.get('latitude'), item.get('longitude')));
                           item.set('distance', dist);
                           item.set('distanceFormat', dist.toFixed(1));
                           var distClass = LaCarteTouch.util.UtilMap.categorie(dist);
                           item.set('distanceClass', distClass);

                           // Gestion des urls data.substring(0, input.length) === input
                           
                           if(item.get('site').substring(0,4) != 'http') { item.set('site', 'http://' + item.get('site')); }
  
                           store.add(item);
                 } // fin if item
             } // fin du each sur les hits
 
             // Fin du chargement : gestion de la vue
             var main = Ext.getCmp('main');
             main.setMasked(false);
             main.setActiveItem(1);
         } // success
      }); // Fin de request
      //*/


   } // Fin de l'action de recherche

});
