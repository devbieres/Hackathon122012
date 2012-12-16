Ext.define("LaCarteTouch.controller.Search", {
   extend: "LaCarteTouch.controller.Base",

   requires: [
       "Ext.data.JsonP" 
   ],

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

      var config = this.getConfig();
      var lat = config.get('latitude');
      var lng = config.get('longitude');

      // Récupération du store
      var store =  scope.getPOIStore();
      
 
      // Nettoyage de la liste
      store.removeAll();

      // Calcul de l'url
      var url = "http://localhost:9200/hack2012/_search";
      if(searchText.length == 0) { searchText = "*"; }
      var param = '{ "from" : 0,"size" : 100, "query" : { "query_string" : {"query" : "' +  searchText + '"}},"filter" : { "geo_distance" : { "distance" : "' +  distance + 'km", "pin" : { "lat": '+ lat  +', "lon" : ' + lng  +  ' } } } }';
      console.log(param);
      //var param = "q=" + searchText;
      //url += param; 
      console.log(url);

      // Chargement d'un JSON
      //var obj ⁼ Ext.create("Ext.data.JsonP");
      Ext.Ajax.request({
         url: url,
         method: 'POST',
         params:  param,
         success: function(result) {
            console.log(result.responseText);
            var temp = Ext.JSON.decode(result.responseText);
            console.log(temp);
             var hits = temp.hits.hits;
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
             // */
         } // success
      }); // Fin de request


   } // Fin de l'action de recherche

});
