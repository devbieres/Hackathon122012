Ext.define("LaCarteTouch.store.Config", {
    extend: "Ext.data.Store",
    config: {
       model: "LaCarteTouch.model.Config",
       proxy: {
           type: "localstorage",
           id: "lacartetouch-config"
       }, // proxy
    }, // config
});
