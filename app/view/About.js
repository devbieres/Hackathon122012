Ext.define("LaCarteTouch.view.About", {
    extend: "Ext.Panel",
    xtype: "aboutlacarte",

    config: { 
       title:'A Propos', iconCls:'info',
       layout: "fit",
       items : [
          {
              xtype:'titlebar', docked:'top', title:'A Propos'
          },
          { 
              xtype:"list", 
              store:"About",
              grouped:true,
              itemTpl: [
                    "<div id='{id}' class='about-item' >",
                       " <img src='./resources/images/about/{id}.png' /> ",
                       " <h2> {titre} </h2> ",
                       " <div class='info' > {info} </div>",
                    "</div>",
                    ].join("")
          }
       ] // items
    } // config
});
