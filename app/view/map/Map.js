Ext.define("LaCarteTouch.view.map.Map", {
      extend: 'Ext.Panel',
      xtype: 'mappanel',
      
      requires: [
          'Ext.Map'
      ],

      config: {
          iconCls: 'download', title:'Départ',
          layout: 'fit',
          items: [
            {
              xtype:'toolbar', title:"Z'êtes là ?",
              docked:'top'
            },
            {
              xtype:'label', html:'<span style="font-size:smaller" > Un click ou un déplacer pour changer. </span>', docked:'top'
            },
            {
               xtype:'map', id:'situationMap', mapOptions:{ zoom: 13 }
            }
          ] // items
      } // fin de config

});
              

