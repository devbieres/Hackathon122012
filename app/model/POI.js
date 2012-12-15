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
         { name: 'mail',             type: 'string' },
         { name: 'telephone',        type: 'string' },
         { name: 'theme',            type: 'string' },
         { name: 'soustheme',        type: 'string' },
         { name: 'latitude',         type: 'decimal' },
         { name: 'longitude',        type: 'decimal' },
         { name: 'gestionnaire',     type: 'string' },
  
       ], // Fields            
    }, // fin de config        
});
