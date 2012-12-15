Ext.define("LaCarteTouch.view.poi.Info", {
    extend: "Ext.Component",
    xtype: "poiinfo",

    config: {
       tpl: Ext.create('Ext.XTemplate',
              "<div class='poi-info' >",
              "  <h2> {nom} </h2>",
              "  <ul> ",
              "       <li><span class='adresse'> {adresse} </span></li>",
              "       <li><span class='codepostal' > {codepostal} </span></li>",
              "       <li><span class='ville'  > {ville} </span></li>",
              "       <li><span class='mail' > {mail} </span></li>",
              "       <li><span class='telephone' > {telephone} </span></li>",
              "       <li><span class='gestionnaire' > {gestionnaire} </span></li>", 
              "       <li><span class='gestionnaire' > Test </span></li>", 
              "  </ul>",
              "</div>"
       ) // tpl
    }, // config
});
