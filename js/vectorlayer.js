//================================================================================
//  Point feature
//================================================================================
var markerFeature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point(-71, 42),
        {data:'some data'},
        {externalGraphic: 'marker.png', graphicHeight: 80, graphicWidth: 70});

vectorLayer.addFeatures(markerFeature);

var pointFeature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point(initlon + 1, initlat + 1),
        {data:'this is just a point'});

vectorLayer.addFeatures(pointFeature);

//================================================================================
//  LineString feature
//================================================================================

var points = [
    new OpenLayers.Geometry.Point(initlon + 0.5, initlat + 0.5),
    new OpenLayers.Geometry.Point(initlon + 1, initlat + 2 ),
    new OpenLayers.Geometry.Point(initlon + 2, initlat - 0.3 ),
    new OpenLayers.Geometry.Point(initlon -1, initlat + 0.2)
];

var linestringFeature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.LineString(points),
    {data: 'this is a linestring'}
);

vectorLayer.addFeatures(linestringFeature);

//================================================================================
//  Polygon feature
//================================================================================

var points2 = [
    new OpenLayers.Geometry.Point(initlon + 0.3, initlat + 0.3),
    new OpenLayers.Geometry.Point(initlon + 0.3, initlat + 0.15),
    new OpenLayers.Geometry.Point(initlon + 0.15, initlat + 0.15),
    new OpenLayers.Geometry.Point(initlon + 0.15, initlat + 0.3)
];

var linearRing = new OpenLayers.Geometry.LinearRing(points2);
var polygon = new OpenLayers.Geometry.Polygon([linearRing]);
var polygonFeature = new OpenLayers.Feature.Vector(polygon);

vectorLayer.addFeatures(polygonFeature);

//================================================================================
//  Point feature inside polygon
//================================================================================

var feature2 = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point(
            polygonFeature.geometry.getVertices()[0].x - 0.05,
            polygonFeature.geometry.getVertices()[0].y - 0.05
        ),
        {data:'this vector is inside the polygon'},
        {externalGraphic: 'marker.png', graphicHeight: 20, graphicWidth: 14});

vectorLayer.addFeatures(feature2);

//================================================================================
//  Layer events
//================================================================================
var layerListeners = {
    featureselected: function(e) {
        console.log(e.object.name + " says: " + e.feature.id + " selected. Data: " + e.feature.data.data);
        return false;
    },
    featureunselected: function(e) {
        console.log(e.object.name + " says: No feature selected.");
    }
};
vectorLayer.events.register('featureselected', null, layerListeners.featureselected);
vectorLayer.events.register('featureunselected', null, layerListeners.featureunselected);

