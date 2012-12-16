Ext.define("LaCarteTouch.controller.Search", {
   extend: "Ext.app.Controller",

   requires: [
       "Ext.data.JsonP" 
   ],

   // Centralisation de la recherche du store local qui est mappé sur la liste:w
   getPOIStore: function() { return Ext.getStore("POIS"); },

   // Configuration
   config: {
       refs: {
         searchText: "#search",
         distanceSelect: "#distanceSelect",
       }, // fin des refs
       control: {
         searchText: {
           keyup: "onSearch",
         },
         distanceSelect: {
           change: "onDistanceChange",
         },
       }
   }, // config

   launch: function() {
          //console.log("Launch !");
   },

   // onDistanceChange
   onDistanceChange: function(scope, newValue, oldValue, eOpts) {
         console.log('onDistanceChange');
         this.doSearch(this);
   }, // changement de distance

   // OnSearch
   onSearch: function(field, e) {
      console.log('OnSearch');
      var searchText = this.getSearchText().getValue();
      if((searchText.length > 3) && (e.event.keyCode == 13)) {
           this.doSearch(this);
      }
   }, // fin de OnSearch

   // Effectue la recherche
   doSearch: function(scope) {
      var searchText = scope.getSearchText().getValue();
      var distance = scope.getDistanceSelect().getValue();
      console.log('doSearch : ' + searchText + " -> " + distance);

      // Récupération du store
      var store =  scope.getPOIStore();
 
      // Nettoyage de la liste
      store.removeAll();

      // Calcul de l'url
      var url = "http://localhost:9200/hack2012/_search?";
      if(searchText.length == 0) { searchText = "*"; }
      //var param = '{ "from" : 0,"size" : 100, "query" : { "query_string" : {"query" : "' +searchText + '"}},"filter" : { "geo_distance" : { "distance" : "1000km", "pin" : { "lat": 47.365464, "lon" : -1.177491 } } } } '
      //var param = "q=" + searchText;
      //url += param; 
      console.log(url);

      // Chargement d'un JSON
      //var obj ⁼ Ext.create("Ext.data.JsonP");
      Ext.data.JsonP.request({
         // Passage de l'url
         url: url,
         // callbackkey
         callbackKey: 'callback',
         // params
         params: {
            from: 0, size:50, q: searchText
         },
         // end param
         success: function(result) {
             var hits = result.hits.hits;
             //console.log(result.hits.hits); 
             for(var i in hits) {
                 var record = hits[i]._source;
                 var now = new Date();
                 var item = Ext.create("LaCarteTouch.model.POI",
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
                                  longitude: record.pin.lon
                                });
                store.add(item);
             } // fin du each sur les hits
         } // success
      }); // Fin de request


   } // Fin de l'action de recherche

});
