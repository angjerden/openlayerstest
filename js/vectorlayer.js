//================================================================================
//  Point feature
//================================================================================
var markerFeature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point(initlon - 2000, initlat + 2000),
        {data:'some data'},
        {externalGraphic: 'marker.png', graphicHeight: 80, graphicWidth: 70});

vectorLayer.addFeatures(markerFeature);

var pointFeature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point(initlon + 800, initlat + 800),
        {data:'this is just a point'});

vectorLayer.addFeatures(pointFeature);

//================================================================================
//  LineString feature
//================================================================================

var points = [
    new OpenLayers.Geometry.Point(initlon + 500, initlat + 500),
    new OpenLayers.Geometry.Point(initlon + 100, initlat + 200 ),
    new OpenLayers.Geometry.Point(initlon + 200, initlat - 300 ),
    new OpenLayers.Geometry.Point(initlon -100, initlat + 200)
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
    new OpenLayers.Geometry.Point(initlon + 600, initlat + 600),
    new OpenLayers.Geometry.Point(initlon + 600, initlat + 300),
    new OpenLayers.Geometry.Point(initlon + 300, initlat + 300),
    new OpenLayers.Geometry.Point(initlon + 300, initlat + 600)
];

var linearRing = new OpenLayers.Geometry.LinearRing(points2);
var polygon = new OpenLayers.Geometry.Polygon([linearRing]);
var polygonFeature = new OpenLayers.Feature.Vector(polygon, {data: 'i am a polygon'});

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

