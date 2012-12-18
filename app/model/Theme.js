Ext.define("LaCarteTouch.model.Theme", {
    extend: "Ext.data.Model",

    config: {
      idProperty: 'code',
      fields: [
        { name: 'code',     type: 'string' },
        { name: 'nom',      type: 'string' }
      ]
    } // config
});
