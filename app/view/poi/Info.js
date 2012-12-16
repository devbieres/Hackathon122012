Ext.define("LaCarteTouch.view.poi.Info", {
    extend: "Ext.Component",
    xtype: "poiinfo",

    config: {
       tpl: Ext.create('Ext.XTemplate',
              "<div class='poi-info' >",
              "  <h2> {nom} </h2>",
              "  <div class='adresse' >",
              "     <img src='./resources/images/adresse.png' /> ",
              "     <span> {adresse} {codepostal} {ville} </span>",
              "  </div>",
              "  <div class='contact' >",
              "    <ul>",
              "      <li class='distance' > <img src='./resources/images/distance.png' > {distanceFormat} km </li>",
              "      {[ this.site(values.site) ]} ",
              "      {[ this.mail(values.mail) ]} ",
              "      {[ this.tel(values.telephone) ]} ",
              "    </ul>",
              "  </div>",
              "  {[ this.description(values.description) ]}",
              {
                   description: function(description) {
                       if(description.trim().length > 0) {
                           return "<div class='description' > <h3> Description </h3> <p> " + description + "</p></div>";
                       }
                   }, // fin de description
                   site: function(site) {
                      if(site.length > 0) {
                            return " <li class='site' ><img src='./resources/images/site.png' /> <span> <a href='" + site  + "' > " + site + " </a> </span></li>";
                      }
                   }, // fin de site
                   mail: function(mail) {
                      if(mail.length > 0) {
                            return " <li class='mail' ><img src='./resources/images/mail.png' /> <span> <a href='mailto:" + mail +  "' > " + mail + " </a> </span></li>";
                      }
                   }, // fin de mail 
                   tel: function(tel) {
                      if(tel.length > 0) {
                            return " <li class='tel' ><img src='./resources/images/tel.png' /> <span> " + tel + " </a> </span></li>";
                      }
                   }, // fin de mail 
              }
       ) // tpl
    }, // config
});
