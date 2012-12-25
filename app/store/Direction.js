Ext.define("LaCarteTouch.store.Direction", {
   extend: "Ext.data.Store",
   config: {
      model: "LaCarteTouch.model.Direction",
      proxy: { type: 'memory' },
      sorters: [ { property: 'index', direction:'ASC' }],
   },
});
