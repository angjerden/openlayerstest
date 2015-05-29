var initlon = -33000;
var initlat = 6559000;

var initpoint = new OpenLayers.LonLat(initlon, initlat);
var initzoom = 8;

//================================================================================
// Creating map
//================================================================================
var mapoptions = {
      projection: new OpenLayers.Projection('EPSG:32633'),
      maxExtent: new OpenLayers.Bounds(-2500000.0,3500000.0,3045984.0,9045984.0),
      units: "m",
      maxResolution: 2708.0, // tilsvarer zoom level 3 (hele er 21664.0)
      numZoomLevels: 18 // egentlig 21, men maxResolution tilsvarer zoom level 3 (følgelig er 0-3 skrudd av)
};
var map = new OpenLayers.Map('map', mapoptions);

//================================================================================
// Creating WMS layers
//================================================================================
var opencacheUrl = 'http://opencache.statkart.no/gatekeeper/gk/gk.open?';

var topo2 = new OpenLayers.Layer.WMS(
    "Topografisk norgeskart2",
    opencacheUrl,
    {
        layers: 'topo2',
        format: 'image/jpeg'
    },
    {attribution:'<a href="http://www.statkart.no">Statens kartverk</a>, <a href="http://www.statkart.no/nor/Land/Fagomrader/Geovekst/">Geovekst</a> og <a href="http://www.statkart.no/?module=Articles;action=Article.publicShow;ID=14194">kommuner</a>'}
);

var topo2graatone = new OpenLayers.Layer.WMS(
    "Topografisk norgeskart2 graatone",
    opencacheUrl,
    {
        layers: 'topo2graatone',
        format: 'image/png'
    }
);

var terreng = new OpenLayers.Layer.WMS(
    "Terreng Norgeskart",
    opencacheUrl,
    {
        layers: 'terreng_norgeskart',
        format: 'image/png'
    }
);
map.addLayers([topo2graatone, topo2, terreng]);

//================================================================================
// Creating Vector layers
//================================================================================
var vectorLayer = new OpenLayers.Layer.Vector("Vectorlayer");
map.addLayer(vectorLayer);
var rogalandLayer = new OpenLayers.Layer.Vector("Rogalandlayer");
map.addLayer(rogalandLayer);

//================================================================================
// Styling layers
//================================================================================
var format = new OpenLayers.Format.SLD();
var sldUrl = "style/default.sld";
var sld;

var sldCallback = function (req) {
    sld = format.read(req.responseXML || req.responseText);

    for (layerName in sld.namedLayers) {
        var layerStyles = sld.namedLayers[layerName].userStyles;
        for (var j = 0; j < layerStyles.length; j++) {
            var style = layerStyles[j];
            map.getLayersByName(layerName)[0].styleMap.styles[style.name] = style;
        }
    }
};

//================================================================================
// Creating SelectElement (SelectFeature) Control
//================================================================================
var selectControlOptions = {
    map: this,
    logmessage: "SelectFeature onSelect method:"
};

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


//================================================================================
// Creating miscellaneous Controls
//================================================================================
map.addControl(new OpenLayers.Control.LayerSwitcher());

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

//================================================================================
// Creating a Panel Control
//================================================================================
//the real navigate control
var navigate = new OpenLayers.Control.Navigation();
map.addControl(navigate);
navigate.activate();

//make a dummy control, so that navigation is "always on", while giving the impression that there is a button for it
var navdummy = new OpenLayers.Control({ title: "Navigate" });
var zoomIn = new OpenLayers.Control.ZoomIn({ title: "Zoom inn"});
var zoomOut = new OpenLayers.Control.ZoomOut({ title: "Zoom ut"});
var zoomBox = new OpenLayers.Control.ZoomBox({ title: "Zoom med boks"});
var zoomMax = new OpenLayers.Control.ZoomToMaxExtent({ title: "Zoom helt ut"});

// create a new panel
var panel = new OpenLayers.Control.Panel({
    //div: document.getElementById('toolbar'), //<- the element to render it in
    displayClass: 'olControlEditingToolbar',
    defaultControl: navdummy //<- this control is activated by default
});

//add the controls, order matters
panel.addControls([
        navdummy,
        zoomIn,
        zoomOut,
        zoomBox,
        zoomMax
    ]);

//add the panel to the map (auto-activates)
map.addControl(panel);

map.setCenter(initpoint, initzoom);

//styling
OpenLayers.Request.GET({ url: sldUrl, callback: sldCallback});

//================================================================================
// Pop up (must be added after map.setCenter()
//================================================================================

var popup = new OpenLayers.Popup("chicken",
        new OpenLayers.LonLat(initlon + 300, initlat + 300),
        new OpenLayers.Size(200, 200),
        "example popup",
        true);

map.addPopup(popup);