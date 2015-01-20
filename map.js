var map = new OpenLayers.Map('map');
var wms = new OpenLayers.Layer.WMS( "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
map.addLayers([wms]);
map.zoomToMaxExtent();

var layerListeners = {
    featureclick: function(e) {
        console.log(e.object.name + " says: " + e.feature.id + " clicked. Data: " + e.feature.data.data);
        return false;
    },
    nofeatureclick: function(e) {
        console.log(e.object.name + " says: No feature clicked.");
    }
};

var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
var feature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point(-71, 42),
        {data:'some data'},
        {externalGraphic: 'marker.png', graphicHeight: 80, graphicWidth: 70});

vectorLayer.addFeatures(feature);
map.addLayer(vectorLayer);

vectorLayer.events.register('featureclick', null, layerListeners.featureclick);
vectorLayer.events.register('nofeatureclick', null, layerListeners.nofeatureclick);

var markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

var size = new OpenLayers.Size(21,25);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon = new OpenLayers.Icon('marker.png', size, offset);
markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(0,0),icon));
markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(10,10),icon.clone()));
var marker = new OpenLayers.Marker(new OpenLayers.LonLat(5, 5), icon.clone());
marker.events.register('mousedown',
    feature,
    function(evt) {
        console.log("Hello from mousedown event");
        OpenLayers.Event.stop(evt);
    });
markers.addMarker(marker);

var points = [
    new OpenLayers.Geometry.Point( 1, 1),
    new OpenLayers.Geometry.Point( 1, 10 ),
    new OpenLayers.Geometry.Point( 10, -5 ),
    new OpenLayers.Geometry.Point( -5, 1)
];

var linestringFeature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.LineString(points)
);

vectorLayer.addFeatures(linestringFeature);

var points2 = [
    new OpenLayers.Geometry.Point(15, 15),
    new OpenLayers.Geometry.Point(15, 10),
    new OpenLayers.Geometry.Point(10, 10),
    new OpenLayers.Geometry.Point(10, 15)
];

var linearRing = new OpenLayers.Geometry.LinearRing(points2);
var polygon = new OpenLayers.Geometry.Polygon([linearRing]);
var polygonFeature = new OpenLayers.Feature.Vector(polygon);

vectorLayer.addFeatures(polygonFeature);

var feature2 = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point(12.5, 12.5),
        {data:'this marker is inside the polygon'},
        {externalGraphic: 'marker.png', graphicHeight: 40, graphicWidth: 33});

vectorLayer.addFeatures(feature2);