SelectElement = OpenLayers.Class(OpenLayers.Control.SelectFeature, {
    layer: null,
    map: null,
    initialize: function (layer, options) {
        this.layer = layer;
        this.map = options.map;
        OpenLayers.Control.SelectFeature.prototype.initialize.apply(this, [layer]);
    },

    onSelect: function (feature) {
        console.log("Selected feature: ");
        console.log(feature);
    }
});