Ext.define("LaCarteTouch.store.POIS", {
     extend: "Ext.data.Store", 
     config: {        
           model: "LaCarteTouch.model.POI",
           proxy: {            
                type:'memory', 
           }, // proxy         
           sorters: [ { property: 'distance', direction: 'ASC' } ],
           grouper: { 
               groupFn : function(record) { return record.get('distanceClass') + "km"; },
               sortProperty : 'distance'
           }
     }, // config              
}); // fin

