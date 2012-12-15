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
       }, // fin des refs
       control: {
         searchText: {
           keyup: "onSearch",
         }
       }
   }, // config

   launch: function() {
          //console.log("Launch !");
   },

   // OnSearch
   onSearch: function(field, e) {
      console.log('OnSearch');
      var searchText = this.getSearchText().getValue();
      if((searchText.length > 3) && (e.event.keyCode == 13)) {
           this.doSearch(this, searchText);
      }
   }, // fin de OnSearch

   // Effectue la recherche
   doSearch: function(scope, searchText) {
      console.log('doSearch : ' + searchText);

      // Récupération du store
      var store =  scope.getPOIStore();
 
      // Nettoyage de la liste
      store.removeAll();

      // Calcul de l'url
      var url = 'http://localhost:9200/hack2012/_search?q='+ searchText + '&pretty=true';
      console.log(url);

      // Chargement d'un JSON
      //var obj ⁼ Ext.create("Ext.data.JsonP");
      Ext.data.JsonP.request({
         // Passage de l'url
         url: url,
         // callbackkey
         callbackKey: 'callback',
         // params
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
                                  soustheme: record.stheme,
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
