Ext.define("LaCarteTouch.model.About", {
   extend: "Ext.data.Model",

   config: {
     idProperty: 'id',
     fields: [
         { name: 'id',               type: 'int'     },
         { name: 'index',            type: 'int'     },
         { name: 'categorie',        type: 'string'  },
         { name: 'titre',            type: 'string'  },
         { name: 'info',             type: 'string'  }, 
     ],
   } // config

});
