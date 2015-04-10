<?xml version="1.0" encoding="utf-8"?>
<StyledLayerDescriptor version="1.0.0"
                       xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
                       xmlns="http://www.opengis.net/sld"
                       xmlns:ogc="http://www.opengis.net/ogc"
                       xmlns:xlink="http://www.w3.org/1999/xlink"
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

    <NamedLayer>
        <Name>Rogalandlayer</Name>

        <!--Visning -->
        <UserStyle>
            <Name>default</Name>
            <Title>Visning</Title>
            <IsDefault>1</IsDefault>
            <FeatureTypeStyle>
                <Rule>
                    <!--<PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#AACC00</CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke">#DA11B4</CssParameter>
                                    <CssParameter name="stroke-width">4</CssParameter>
                                </Stroke>
                            </Mark>
                            <Size>27</Size>
                        </Graphic>
                    </PointSymbolizer>-->
                    <PointSymbolizer>
                        <Graphic>
                            <ExternalGraphic>
                                <OnlineResource xlink:type="simple" xlink:href="svg/marker.svg" />
                                <Format>image/png</Format>
                            </ExternalGraphic>
                            <Mark>
                                <Fill>
                                    <CssParameter name="fill">#000</CssParameter>
                                </Fill>
                            </Mark>
                            <Size>21</Size>
                        </Graphic>
                    </PointSymbolizer>
                    <TextSymbolizer>
                        <Label>
                            <ogc:PropertyName>count</ogc:PropertyName>
                        </Label>
                        <Font>
                            <CssParameter name="font-family">Arial</CssParameter>
                            <CssParameter name="font-size">10</CssParameter>
                            <CssParameter name="font-style">normal</CssParameter>
                            <CssParameter name="font-weight">bold</CssParameter>
                        </Font>
                        <Fill>
                            <CssParameter name="fill">#000000</CssParameter>
                        </Fill>
                    </TextSymbolizer>
                </Rule>
            </FeatureTypeStyle>
        </UserStyle>

        <!-- Valgt -->
        <UserStyle>
            <Name>select</Name>
            <Title>Valgt</Title>
            <IsDefault>1</IsDefault>
            <FeatureTypeStyle>

                <Rule>
                   <PointSymbolizer>
                        <Graphic>
                            <ExternalGraphic>
                                <OnlineResource xlink:type="simple" xlink:href="svg/marker-selected.svg" />
                                <Format>image/png</Format>
                            </ExternalGraphic>
                            <Mark>
                                <Fill>
                                    <CssParameter name="fill">#000</CssParameter>
                                </Fill>
                            </Mark>
                            <Size>23</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>

            </FeatureTypeStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>