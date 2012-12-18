Ext.define("LaCarteTouch.store.Theme", {
   extend: "Ext.data.Store",
   config: {
      model: "LaCarteTouch.model.Theme",
      proxy: { type: 'ajax', url:'themes.json' },
      sorters: [ { property: 'nom', direction:'DESC' }],
      autoLoad:true,
   },
});
