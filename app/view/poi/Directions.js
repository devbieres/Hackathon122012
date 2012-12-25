Ext.define("LaCarteTouch.view.poi.Directions", {
    extend: "Ext.Panel",
    xtype: "poidirection",

    config: { 
       fullscreen: true,
       layout: "fit",
       items : [
          {
              xtype:"button", id:"btnDirections", text:"Calculer", ui:'action', docked:'top'
          },
          { 
              xtype:"list", emptyText:"Lancer un calcul",
              store:"Direction",
              itemTpl: [
                    "<div id='{id}' class='direction-item' >",
                       " <img src='./resources/images/Directions/{direction}.png' /> ",
                       " <div class='info' > {info} </div>",
                       " <div class='detail' > ",
                       "          <span> {distance} km </span>",
                       "   </div>",
                       " </div>",   
                       "</div>",
                       ].join("")
          }
       ] // items
    } // config
});
