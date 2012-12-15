Ext.define("LaCarteTouch.view.poi.List", {
   extend: "Ext.List",         
   xtype: "poilist",

   config: {                   
     title: "La carte",           
     store: "POIS",           
     loadingText: "Chargement ...",  
     emptyText: "<pre><div class='list-empty' > Désolé ... rien pour le moment </div></pre>",
     itemTpl: [                
                "<div id='{id}' class='poi' >",
                  " <div class='info' >",         
                  "   <div class='title' > {nom} </div>",
                  "   <div class='detail' > ",
                  "          <span> Ville : {ville} </span>",
                  "          <span> Type : {type} </span>",
                  "   </div>",
                  " </div>",   
                "</div>"       
            ].join("")         
   } // config                 
    
}); 

