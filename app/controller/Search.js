Ext.define("LaCarteTouch.controller.Search", {
   extend: "LaCarteTouch.controller.Base",

   requires: [
       "Ext.data.JsonP", "Ext.form.Panel", "Ext.field.Select", "Ext.field.Slider"
   ],

   // Configuration
   config: {
       refs: {
         //typeSelect: "#typeSelect",
         formThemeSelect: "#formThemeSelect",
         formTypeSelect:  "#formTypeSelect",
         formDistance:    "#formDistance",
         formCombien:     "#formCombien",
         formQuery:       "#formQuery",
         btnSearch:       "#btnSearch"
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
         console.log('OnThemeChange');
         // Application d'un filtre sur le store des types
         var store = this.getTypeStore();
         store.clearFilter(true);
         store.filter(function(type) { return type.get('theme') == newValue; });
   },

   onBtnSearchTap: function() {
         console.log('OnBtnSeachTap');
         this.doSearch(this);
   },




   // Effectue la recherche
   doSearch: function(scope) {
      console.log('DoSearch');

      // -1- Récupération des différentes variables de recherche
      // --> IHM
      var theme = this.getFormThemeSelect().getValue();
      console.log("Theme : " + theme);
      var type = this.getFormTypeSelect().getValue();
      console.log("Type : " + type);
      var distance = this.getFormDistance().getValue();
      console.log("distance : " + distance);
      var combien = this.getFormCombien().getValue();
      console.log("Combien : " + combien);
      var motscles = this.getFormQuery().getValue();
      if(motscles.length <= 0) { motscles = "*"; }
      console.log("Mots clés : " + motscles);

      // --> Config
      var config = this.getConfig();
      var lat = config.get('latitude');
      var lng = config.get('longitude');
      console.log('doSearch (1) :' + config.get('latitude') + ' - ' +  config.get('longitude'))

      // -2- Génération de la requête
      var param = '{ "from" : 0, "size" : ' + combien +', "query" :  { "query_string" : {"query" : "' + motscles + '" } }, "filter" : {  "and" : [ {  "geo_distance" : { "distance" : "' + distance + '", "pin" : { "lat":' + lat +', "lon":' + lng +' } } }, { "term" : {  "theme": "' + theme + '" } }, { "term" : {  "type": "' + type + '" } } ]  }, "sort" : [ { "_geo_distance" : { "pin" : { "lat": ' + lat + ', "lon" : ' + lng + '  }, "order" : "asc", "unit" : "km" } } ] }';
      console.log(param);

      // -3- Récupération du store
      var store =  scope.getPOIStore();
      store.removeAll();

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
              console.log('Ajax Search :' + config.get('latitude') + ' - ' +  config.get('longitude'))

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
  
                           store.add(item);
                           console.log(item.get('nom'));
                 } // fin if item
             } // fin du each sur les hits
         } // success
      }); // Fin de request
      //*/


   } // Fin de l'action de recherche

});
