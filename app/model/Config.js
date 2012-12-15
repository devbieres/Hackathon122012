Ext.define("LaCarteTouch.model.Config", {
    extend: "Ext.data.Model",

    config: {
      idProperty: 'code',
      fields: [
        { name: 'code',     type: 'string' },
        { name: 'distance', type: 'int' },
        { name: 'latitude', type: 'decimal' },
        { name: 'longitude', type: 'decimal' }
      ]
    } // config
});
