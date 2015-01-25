SelectElement = OpenLayers.Class(OpenLayers.Control.SelectFeature, {
    layer: null,
    map: null,
    logmessage: null,
    initialize: function (layer, options) {
        this.layer = layer;
        this.map = options.map;
        this.logmessage = options.logmessage;
        OpenLayers.Control.SelectFeature.prototype.initialize.apply(this, [layer]);
    },

    onSelect: function (feature) {
        console.log(this.logmessage);
        console.log(feature);
    }
});