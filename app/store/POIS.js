Ext.define("LaCarteTouch.store.POIS", {
     extend: "Ext.data.Store", 
     config: {        
           model: "LaCarteTouch.model.POI",
           proxy: {            
                type:'memory', 
           }, // proxy         
           sorters: [ { property: 'Nom', direction: 'DESC' } ],
           grouper: function(record) { return record.get('type'); }  
     }, // config              
}); // fin

