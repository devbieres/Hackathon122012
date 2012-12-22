Ext.define("LaCarteTouch.view.map.Map", {
      extend: 'Ext.Panel',
      xtype: 'mappanel',
      
      requires: [
          'Ext.Map',
      ],

      config: {
          iconCls: 'locate', title:'Départ',
          layout: 'fit',
          fullsreen: 'true',
          items: [
            {
              xtype:'toolbar', title:"Z'êtes là ?",
              docked:'top'
            },
            {
              xtype:'label', html:'<span style="font-size:smaller" > Un click ou un déplacer pour changer. </span>', docked:'top'
            },
            {
               xtype:'mapleaf', id:'situationMap'
            }
          ] // items
      } // fin de config

});
              

