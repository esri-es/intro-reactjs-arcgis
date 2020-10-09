import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from 'esri-loader';
import { Checkbox, Row, Col } from 'antd';

export const Map2d = () => {
    const mapRef = useRef();
    var view;
    var basemapGallery;
    const [showBaseMaps, setShowBaseMaps] = useState(false);
    const [showTrailheads, setShowTrailheads] = useState(false);
    const [showTrails, setShowTrails] = useState(false);
    const [showParks, setShowParks] = useState(false);
    const [showBikes, setShowBikes] = useState(false);

    useEffect(
      () => {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules([
          'esri/Map', 'esri/views/MapView',
          "esri/widgets/BasemapToggle", "esri/widgets/BasemapGallery",
       
          "esri/layers/FeatureLayer",
          "esri/WebMap",

          "esri/widgets/Legend",
        ], { css: true })
        .then(([
          ArcGISMap, MapView, 
          BasemapToggle, BasemapGallery,
          FeatureLayer,
          WebMap,
          Legend]) => {
          const map = new ArcGISMap({
            basemap: 'topo-vector'
          });

          view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-118.805, 34.027], // longitude, latitude
            zoom: 13
          });         

          var basemapGallery = new BasemapGallery({
            view: view,
            source: {
              portal: {
                url: "https://www.arcgis.com",
                useVectorBasemaps: true  // Load vector tile basemaps
              }
            }
          });
          if (showBaseMaps) view.ui.add(basemapGallery, "top-right");

          var trailheadsRenderer = {
            type: "simple",
            symbol: {
              type: "picture-marker",
              url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
              width: "18px",
              height: "18px"
            }
          };

          // Trailheads
          var trailheadsLabels = {
            symbol: {
              type: "text",
              color: "#FFFFFF",
              haloColor: "#5E8D74",
              haloSize: "2px",
              font: {
                size: "12px",
                family: "Noto Sans",
                style: "italic",
                weight: "normal"
              }
            },
            labelPlacement: "above-center",
            labelExpressionInfo: {
              expression: "$feature.TRL_NAME"
            }
          };

          var popupTrailheads = {
            title: "{TRL_NAME}",
            content:
              "<b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
          };

          var trailheadsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
            renderer: trailheadsRenderer,
            labelingInfo: [trailheadsLabels],

            outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
            popupTemplate: popupTrailheads
          });
          
          if (showTrailheads) map.add(trailheadsLayer);
          
          // Trails
          var trailsRenderer = {
            type: "simple",
            symbol: {
              color: "#BA55D3",
              type: "simple-line",
              style: "solid"
            },
            visualVariables: [
              {
                type: "size",
                field: "ELEV_GAIN",
                minDataValue: 0,
                maxDataValue: 2300,
                minSize: "3px",
                maxSize: "7px"
              }
            ]
          };
          var trailsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            renderer: trailsRenderer,
            opacity: 0.75,
            outFields: ["TRL_NAME", "ELEV_GAIN"],
            popupTemplate: {
              // Enable a popup
              title: "{TRL_NAME}", // Show attribute value
              content: "The trail elevation gain is {ELEV_GAIN} ft." // Display text in pop-up
            }
          });

          if (showTrails) map.add(trailsLayer, 0);

          var bikeTrailsRenderer = {
            type: "simple",
            symbol: {
              type: "simple-line",
              style: "short-dot",
              color: "#FF91FF",
              width: "1px"
            }
          };
          var bikeTrails = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            renderer: bikeTrailsRenderer,
            definitionExpression: "USE_BIKE = 'YES'"
          });
          
          if (showBikes) map.add(bikeTrails, 1);

          // Parks and open spaces (polygons)
          const createFillSymbol = (value, color) => {
            return {
              value: value,
              symbol: {
                color: color,
                type: "simple-fill",
                style: "solid",
                outline: {
                  style: "none"
                }
              },
              label: value
            };
          }
          
          var openSpacesRenderer = {
            type: "unique-value",
            field: "TYPE",
            uniqueValueInfos: [
              createFillSymbol("Natural Areas", "#9E559C"),
              createFillSymbol("Regional Open Space", "#A7C636"),
              createFillSymbol("Local Park", "#149ECE"),
              createFillSymbol("Regional Recreation Park", "#ED5151")
            ]
          };
          var popupOpenspaces = {
            title: "{PARK_NAME}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "AGNCY_NAME",
                    label: "Agency",
                    isEditable: true,
                    tooltip: "",
                    visible: true,
                    format: null,
                    stringFieldOption: "text-box"
                  },
                  {
                    fieldName: "TYPE",
                    label: "Type",
                    isEditable: true,
                    tooltip: "",
                    visible: true,
                    format: null,
                    stringFieldOption: "text-box"
                  },
                  {
                    fieldName: "ACCESS_TYP",
                    label: "Access",
                    isEditable: true,
                    tooltip: "",
                    visible: true,
                    format: null,
                    stringFieldOption: "text-box"
                  },
                  {
                    fieldName: "GIS_ACRES",
                    label: "Acres",
                    isEditable: true,
                    tooltip: "",
                    visible: true,
                    format: {
                      places: 2,
                      digitSeparator: true
                    },
                    stringFieldOption: "text-box"
                  }
                ]
              }
            ]
          };

          var openspaces = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
            renderer: openSpacesRenderer,
            outFields: ["TYPE", "PARK_NAME", "AGNCY_NAME", "ACCESS_TYP", "GIS_ACRES"],
            popupTemplate: popupOpenspaces,
            opacity: 0.2
          });
          
          var legend = new Legend({
            view: view
          });
          
          if (showParks) {
            map.add(openspaces, 0);
            view.ui.add(legend, "bottom-left");
          }

 
          // Cargar mapa de web app
          // var webmap = new WebMap({
          //   portalItem: { // autocasts as new PortalItem()
          //     id: "593cc26c58584513935ca944ec49f283"
          //   }
          // });
          // view = new MapView({
          //   container: mapRef.current,
          //   map: webmap,
          // });

          return () => {  
            if (view) {
              console.log('view')
              // destroy the map view
              view.container = null;
            }
          };
        });
      }, [showBaseMaps, showTrailheads, showTrails, showParks, showBikes]
    );

 

    const onChange = (e, option) => {
      if (option === 'mapaBase') setShowBaseMaps(e.target.checked);
      if (option === 'trailheads') setShowTrailheads(e.target.checked);
      if (option === 'trails') setShowTrails(e.target.checked);
      if (option === 'parks') setShowParks(e.target.checked);
      if (option === 'bikes') setShowBikes(e.target.checked);
    };

    return (
      <div>
        <Row>
          <Col span={20}><div className="webmap" ref={mapRef} /></Col>
          <Col span={4}>
            <ul className="option-list">
              <li><Checkbox onChange={(e) => onChange(e, 'mapaBase')}>Opciones mapas base</Checkbox></li>
              <li><Checkbox onChange={(e) => onChange(e, 'trailheads')}>Comienzos de rutas</Checkbox></li>
              <li><Checkbox onChange={(e) => onChange(e, 'trails')}>Rutas</Checkbox></li>
              <li><Checkbox onChange={(e) => onChange(e, 'parks')}>Espacios abiertos</Checkbox></li>
              <li><Checkbox onChange={(e) => onChange(e, 'bikes')}>Rutas en bici</Checkbox></li>
            </ul>
          </Col>
        </Row>
        <div className="code-section">
          <p><b>Mapa base</b></p>
          <pre>{`
            const map = new ArcGISMap({
              basemap: 'topo-vector'
            });
                
            view = new MapView({
              container: mapRef.current,<br/>
              map: map,<br/>
              center: [-118.805, 34.027],<br/>
              zoom: 13
             }); 
          `}</pre>
        </div>
     
        {showBaseMaps &&
          <div className="code-section">
            <p><b>Opciones mapas base</b></p>
            <pre>{`
                var basemapGallery = new BasemapGallery({
                  view: view,
                  source: {
                    portal: {
                      url: "https://www.arcgis.com",
                      useVectorBasemaps: true  // Load vector tile basemaps
                    }
                  }
                });
                view.ui.add(basemapGallery, "top-right");
            `}
            </pre>
          </div>}

        {showTrailheads &&
          <div className="code-section">
            <p><b>Inicio de rutas</b></p>
            <pre>{`
              var trailheadsLayer = new FeatureLayer({
                url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0", <br />
                renderer: trailheadsRenderer,
                labelingInfo: [trailheadsLabels],
                outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
                popupTemplate: popupTrailheads
              });`}
            </pre>
          </div>}
      </div>
    );
};