Ext.define("LaCarteTouch.model.Direction", {
   extend: "Ext.data.Model",

   config: {
     idProperty: 'id',
     fields: [
         { name: 'id',               type: 'int'     },
         { name: 'poiid',            type: 'int'     },
         { name: 'index',            type: 'int'     },
         { name: 'info',             type: 'string'  }, 
         { name: 'distance',         type: 'decimal' },
         { name: 'direction',        type: 'string'  },
         { name: 'lat',              type: 'decimal' },
         { name: 'lng',              type: 'decimal' }
     ],
   } // config

});
