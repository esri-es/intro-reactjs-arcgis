import React, { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';

import '../index.css';

export const Cluster = () => {
  const mapRef = useRef();

  useEffect(
    () => {
      loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/widgets/Legend",
      "esri/widgets/Slider",
      "esri/widgets/Expand"], { css: true })
      .then(([ArcGISMap, MapView, FeatureLayer, Legend, Slider, Expand]) => {
        const clusterLabelThreshold = 1500;

        const haloColor = "#373837";
        const color = "#f0f0f0";

        const clusterConfig = {
          type: "cluster",
          popupTemplate: {
            content: [
              {
                type: "text",
                text:"This cluster represents <b>{cluster_count}</b> power plants"
              },
              {
                type: "text",
                text:"Most power plants in this cluster generate power from <b>{cluster_type_fuel1}</b>."
              }
            ],
            fieldInfos: [
              {
                fieldName: "cluster_count",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "cluster_avg_capacity_mw",
                format: {
                  places: 2,
                  digitSeparator: true
                }
              },
              {
                fieldName: "expression/total-mw",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              }
            ],
            expressionInfos: [
              {
                name: "total-mw",
                title: "total megawatts",
                expression: "$feature.cluster_avg_capacity_mw * $feature.cluster_count"
              }
            ]
          },
          clusterRadius: "120px",
          labelsVisible: true,
          labelingInfo: [
            {
              symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                  family: "Noto Sans",
                  size: "11px"
                },
                xoffset: 0,
                yoffset: "-15px"
              },
              labelPlacement: "center-center",
              labelExpressionInfo: {
                expression: "Text($feature.cluster_count, '#,### plants')"
              },
              where: `cluster_avg_capacity_mw > ${clusterLabelThreshold}`
            },
            {
              symbol: {
                type: "text",
                haloColor,
                haloSize: "2px",
                color,
                font: {
                  weight: "bold",
                  family: "Noto Sans",
                  size: "18px"
                },
                xoffset: 0,
                yoffset: 0
              },
              labelPlacement: "center-center",
              labelExpressionInfo: {
                expression: "$feature.cluster_type_fuel1"
              },
              where: `cluster_avg_capacity_mw > ${clusterLabelThreshold}`
            },
            {
              symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                  weight: "bold",
                  family: "Noto Sans",
                  size: "12px"
                },
                xoffset: 0,
                yoffset: "15px"
              },
              deconflictionStrategy: "none",
              labelPlacement: "center-center",
              
              where: `cluster_avg_capacity_mw > ${clusterLabelThreshold}`
            },
            {
              symbol: {
                type: "text",
                haloColor,
                haloSize: "1px",
                color,
                font: {
                  family: "Noto Sans",
                  size: "11px"
                },
                xoffset: 0,
                yoffset: "-15px"
              },
              labelPlacement: "above-right",
              labelExpressionInfo: {
                expression: "Text($feature.cluster_count, '#,### plants')"
              },
              where: `cluster_avg_capacity_mw <= ${clusterLabelThreshold}`
            },
            {
              symbol: {
                type: "text",
                haloColor,
                haloSize: "2px",
                color,
                font: {
                  weight: "bold",
                  family: "Noto Sans",
                  size: "18px"
                }
              },
              labelPlacement: "above-right",
              where: `cluster_avg_capacity_mw <= ${clusterLabelThreshold}`
            }
          ]
        };
        const layer = new FeatureLayer({
          portalItem: {
            id: "eb54b44c65b846cca12914b87b315169"
          },
          featureReduction: clusterConfig,
          popupEnabled: true,
          labelsVisible: true,
        });

        const map = new ArcGISMap({
          basemap: {
            portalItem: {
              id: "8d91bd39e873417ea21673e0fee87604"
            }
          },
          layers: [layer]
        });

        const view = new MapView({
          container: mapRef.current,
          map: map,
          extent: {
            spatialReference: {
              latestWkid: 3857,
              wkid: 102100
            },
            xmin: -42087672,
            ymin: 4108613,
            xmax: -36095009,
            ymax: 8340167
          }
        });

        layer.when().then(function () {
          const renderer = layer.renderer.clone();
          renderer.visualVariables = [
            {
              type: "size",
              field: "capacity_mw",
              legendOptions: {
                title: "Capacity (MW)"
              },
              minSize: "24px",
              maxSize: "100px",
              minDataValue: 1,
              maxDataValue: 5000
            }
          ];
          layer.renderer = renderer;
        });

        new Legend({
          view: view,
          container: "legendDiv"
        });
        
        const infoDiv = document.getElementById("infoDiv");
        view.ui.add(
          new Expand({
            view: view,
            content: infoDiv,
            expandIconClass: "esri-icon-layer-list",
            expanded: true
          }),
          "top-right"
        );

        // Filtro de centrales eléctricas con X tamaño/megawatios
        view.whenLayerView(layer).then(function (layerView) {
          const field = "capacity_mw";

          const slider = new Slider({
            min: 0,
            max: 2000,
            values: [0],
            container: document.getElementById("sliderDiv"),
            visibleElements: {
              rangeLabels: true
            },
            precision: 0
          });

          const sliderValue = document.getElementById("sliderValue");

          slider.on(["thumb-change", "thumb-drag"], function (event) {
            sliderValue.innerText = event.value;
            layerView.filter = {
              where: field + " >= " + event.value
            };
          });
        });
      });
    }
  );
  return (
    <div>  
      <div id="map" className="webmap" ref={mapRef} />
      <div id="infoDiv" className="esri-widget">
        <div id="description">
          Show power plants with at least
          <span id="sliderValue">0</span> megawatts of capacity
        </div>
        <div id="sliderContainer">
          <div id="sliderDiv"></div>
        </div>
        <div id="legendDiv"></div>
      </div>
    </div>
  );
}
