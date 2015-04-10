var sandnesFeature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Point(initlon, initlat),
    {
        "count": "23"
    });

rogalandLayer.addFeatures(sandnesFeature);
