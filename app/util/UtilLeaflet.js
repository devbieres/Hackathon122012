/* 
  Le code suivant est une adaptation d'un exemple de code disponible ici :
    https://github.com/fredleefarr/Ext.ux.Leaflet
*/
Ext.define('LaCarteTouch.util.UtilLeaflet', {
    extend: 'Ext.Component',
    xtype:'mapleaf',
    map: null,
    config: {
        map: null,
        lat: 47.217316595885734,
        lng: -1.5465397033691520,
        zoom: 14,
        isRendered: 0
    },
    constructor: function () {
        this.callParent(arguments);
        this.element.setVisibilityMode(Ext.Element.OFFSETS);
        this.on('painted', this.renderMap, this);
    },

    doResize: function() {
        var map = this.getMap();
        if (map) {
            map.invalidateSize();
        }
    },

    renderMap: function () {
        if (this.map) {
            return true;
        }
        this.map = new L.Map(this.element.dom, {
            zoomControl: true,
            trackResize: true 
        });
        var cloudmade = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        });

        this.map.addLayer(cloudmade).setView(new L.LatLng(this.getLat(), this.getLng()), this.getZoom());
        this.map.addEventListener('click', function(e) { this.fireEvent("mapClick", e.latlng.lat, e.latlng.lng); }, this);

        this.setIsRendered(1);
        this.fireEvent("rendered");
    },

    // Center
    setMapCenter: function(lat, lng) {
          this.setLat(lat);
          this.setLng(lng);

          if(this.map) { this.map.setView(new L.LatLng(lat, lng), this.getZoom()); }
    },

    // Add Marker
    addMarker: function(lat, lng, iconUrl) {
        if(! this.map) { return null; }
        // -1-
        var latlng = new L.LatLng(lat, lng);
        // -2-
        var icon = L.icon( { iconUrl: iconUrl } );
        // -3-
        var marker = new L.marker(latlng, { icon: icon, draggable: true} );
        // -4-
        marker.addTo(this.map);
        // -5-
        return marker;
    },
   
    // Remove Marker
    removeMarker: function(marker) {
        if(! this.map) { return null; }
        if(! marker) { return null; }
        this.map.removeLayer(marker);
    },

    onUpdate: function (map, e, options) {
        this.setHtml((options || {}).data);
    },


    onDestroy: function () {
        this.callParent();
    }

}, function () {

});

