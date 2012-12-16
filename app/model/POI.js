Ext.define("LaCarteTouch.model.POI", {
    extend: "Ext.data.Model",  

    config: {
       idProperty: 'id',       
       fields: [               
         { name: 'id',               type: 'int' },
         { name: 'nom',              type: 'string' },
         { name: 'adresse',         type: 'string' },
         { name: 'codepostal',       type: 'string' },
         { name: 'ville',            type: 'string' },
         { name: 'site',            type: 'string' },
         { name: 'mail',             type: 'string' },
         { name: 'telephone',        type: 'string' },
         { name: 'theme',            type: 'string' },
         { name: 'soustheme',        type: 'string' },
         { name: 'type',             type: 'string' },
         { name: 'latitude',         type: 'decimal' },
         { name: 'longitude',        type: 'decimal' },
         { name: 'gestionnaire',     type: 'string' },
         { name: 'description',     type: 'string' },
         { name: 'distance',        type: 'decimal' },
         { name: 'distanceFormat',        type: 'string' },
         { name: 'distanceClass',     type:'string'},
  
       ], // Fields            
    }, // fin de config        
});
