Ext.define("LaCarteTouch.store.About", {
   extend: "Ext.data.Store",
   config: {
      model: "LaCarteTouch.model.About",
      proxy: { type: 'ajax', url:'about.json' },
      sorters: [ { property: 'index', direction:'ASC' }],
      grouper: { 
          groupFn : function(record) { return record.get('categorie'); },
          sortProperty: 'index',
      },
      autoLoad:false
   },
});
