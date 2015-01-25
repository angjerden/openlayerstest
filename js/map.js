var initlon = 5.7;
var initlat = 58.9;

var initpoint = new OpenLayers.LonLat(initlon, initlat);
var initzoom = 9;

var map = new OpenLayers.Map('map');
var wms = new OpenLayers.Layer.WMS( "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
map.addLayers([wms]);
map.setCenter(initpoint, initzoom);

var mousePositionControl = new OpenLayers.Control.MousePosition(
    {
        prefix: '<a href="http://spatialreference.org/ref/epsg/4326/">' +
            'EPSG:4326</a> coordinates: ',
        separator: ' , ',
        numDigits: 2,
        emptyString: 'N/A'
    }
);
map.addControl(mousePositionControl);

var scaleLine = new OpenLayers.Control.ScaleLine();
map.addControl(scaleLine);

var selectControlOptions = {
    map: this,
    logmessage: "SelectFeature onSelect method:"
};

var vectorLayer = new OpenLayers.Layer.Vector("Vectorlayer");
map.addLayer(vectorLayer);
var rogalandLayer = new OpenLayers.Layer.Vector("Rogalandlayer");
map.addLayer(rogalandLayer);

var vectorSelectControl = new SelectElement([vectorLayer, rogalandLayer], selectControlOptions);
map.addControl(vectorSelectControl); //add control to the map before activating it
vectorSelectControl.activate();

//Apparently it doesn't work with two SelectFeature controls in the same map
//only one of them will remain active
/*var rogalandSelectControl = new SelectElement(rogalandLayer, {
    map: this,
    logmessage: "SelectFeature in Rogaland onSelect method:"
    });
map.addControl(rogalandSelectControl);
rogalandSelectControl.activate();*/
