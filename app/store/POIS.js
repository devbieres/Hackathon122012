Ext.define("LaCarteTouch.store.POIS", {
     extend: "Ext.data.Store", 
     config: {        
           model: "LaCarteTouch.model.POI",
           proxy: {            
                type:'memory', 
           }, // proxy         
           sorters: [ { property: 'distance', direction: 'ASC' } ],
           grouper: function(record) { return record.get('type'); }  
     }, // config              
}); // fin

