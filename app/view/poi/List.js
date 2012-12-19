Ext.define("LaCarteTouch.view.poi.List", {
   extend: "Ext.List",         
   xtype: "poilist",

   config: {                   
     title: "La Liste",           
     store: "POIS",           
     loadingText: "Chargement ...",  
     emptyText: "<pre><div class='list-empty' > Désolé ... rien pour le moment </div></pre>",
     grouped: true,
     itemTpl: [                
                "<div id='{id}' class='poi-item' >",
                  " <img src='./resources/images/{type}/{distanceClass}.png' /> ",
                  " <div class='info' >",         
                  "   <div class='title' > {nom} </div>",
                  "   <div class='distance' >A environ : {distanceFormat} km</div>",
                  "   <div class='detail' > ",
                  "          <span> {codepostal}</span>",
                  "          <span> {ville} </span>",
                  "   </div>",
                  " </div>",   
                "</div>",
            ].join("")         
   } // config                 
    
}); 

