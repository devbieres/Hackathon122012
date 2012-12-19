Ext.define("LaCarteTouch.view.form.Search", {
      extend: 'Ext.Panel',
      xtype: 'searchform',

      config: {
         title:'Recherche',
         iconCls:'search',
         layout:'vbox',

         items: [
            {
              xtype:'titlebar', docked:'top', title:'Vous cherchez ?'
            }, //titlebar
            {
              xtype:'formpanel',
              flex:1,
              items: [
                 { xtype:'selectfield', store:'Theme', displayField:'nom', valueField:'code', id:'formThemeSelect', label:'Thème' },
                 { xtype:'selectfield', store:'Type', displayField:'nom', valueField:'code', id:'formTypeSelect', label:'Type' },
                 /*
                 { xtype:'sliderfield', id:'formDistance', label:'Distance <br/>(1km)', value:1, minValue:1, maxValue:50, increment:1,
                           listeners:{ 
                               drag: function(slider, s1, thumb, e, eOpts) {
                                    var panel = Ext.getCmp('sliderPanel');
                                    panel.showBy(thumb);
                                    panel.element.setHtml(slider.getValue());
                                }, // fin de drag
                                dragend: function(slider, s1, thumb, value, e, eOpts) {
                                    var panel = Ext.getCmp('sliderPanel');
                                    panel.hide();
                                    slider.setLabel('Distance <br/>('+ value +'km)');
                                }
                            }
                 },*/
                 {
                     xtype:'selectfield', label:'Distance',
                     id:'formDistance',
                     name:'options',
                     value:'5',
                     options: [
                             { text: '1 km', value:'1' },
                             { text: '5 km', value:'5' },
                             { text: '15 km', value:'15' },
                             { text: '30 km', value:'30' },
                             { text: '50 km', value:'50' },
                     ],
                 },
                 { xtype:'sliderfield', id:'formCombien', label:'Nombre <br/>(25)', value:25, minValue:25, maxValue:250, increment:25 ,
                           listeners:{ 
                               drag: function(slider, s1, thumb, e, eOpts) {
                                    var panel = Ext.getCmp('sliderPanel');
                                    panel.showBy(thumb);
                                    panel.element.setHtml(slider.getValue());
                                }, // fin de drag
                                dragend: function(slider, s1, thumb, value, e, eOpts) {
                                    var panel = Ext.getCmp('sliderPanel');
                                    panel.hide();
                                    slider.setLabel('Nombre <br/> ('+ value +')');
                                }
                            }
                 },
                 { xtype:'searchfield', id:'formQuery', label:'Mots Clés', placeholder:'Théatre, Stereolux ...' },
                 { xtype:'button', id:'btnSearch', text:'Go !', ui:'action' },
              ], // items du formulaire


            },
            { xtype:'panel', id:'sliderPanel', floating:'true', width:'50', height:'30', styleHtmlContent: true, style:'background-color:#FFF', hidden:true }

         ] // items
  
      },

});
