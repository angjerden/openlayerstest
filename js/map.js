var initlon = -33000;
var initlat = 6559000;

var initpoint = new OpenLayers.LonLat(initlon, initlat);
var initzoom = 8;

var mapoptions = {
      projection: new OpenLayers.Projection('EPSG:32633'),
      maxExtent: new OpenLayers.Bounds(-2500000.0,3500000.0,3045984.0,9045984.0),
      units: "m",
      maxResolution: 2708.0, // tilsvarer zoom level 3 (hele er 21664.0)
      numZoomLevels: 18 // egentlig 21, men maxResolution tilsvarer zoom level 3 (følgelig er 0-3 skrudd av)
};

var map = new OpenLayers.Map('map', mapoptions);

map.addControl(new OpenLayers.Control.LayerSwitcher());

var topo2 = new OpenLayers.Layer.WMS(
"Topografisk norgeskart2",'http://opencache.statkart.no/gatekeeper/gk/gk.open?',
  {
layers: 'topo2',
format: 'image/jpeg'
},
  {attribution:'<a href="http://www.statkart.no">Statens kartverk</a>, <a href="http://www.statkart.no/nor/Land/Fagomrader/Geovekst/">Geovekst</a> og <a href="http://www.statkart.no/?module=Articles;action=Article.publicShow;ID=14194">kommuner</a>'}
);

var topo2graatone = new OpenLayers.Layer.WMS(
    "Topografisk norgeskart2 graatone",
    'http://opencache.statkart.no/gatekeeper/gk/gk.open?',
    {
        layers: 'topo2graatone',
        format: 'image/png'
    }
);

map.addLayers([topo2graatone, topo2]);
map.setCenter(initpoint, initzoom);

var mousePositionControl = new OpenLayers.Control.MousePosition(
    {
        prefix: '<a href="http://spatialreference.org/ref/epsg/32633/">' +
            'EPSG:32633</a> coordinates: ',
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
