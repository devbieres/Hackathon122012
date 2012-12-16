Ext.define("LaCarteTouch.store.Type", {
   extend: "Ext.data.Store",
   config: {
      model: "LaCarteTouch.model.Type",
      proxy: { type: 'ajax', url:'types.json' },
      sorters: [ { property: 'nom', direction:'DESC' }],
      autoLoad:true,
   },
});
