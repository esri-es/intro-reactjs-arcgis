import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const StreamLayerWS = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/StreamLayer"], { css: true })
        .then(([ArcGISMap, MapView, StreamLayer]) => {
          const layer = new StreamLayer({
            popupTemplate: {
              content: "OBJECTID={OBJECTID}, TRACKID={TRACKID}",
            },
            
            webSocketUrl: "ws://localhost:8000",
            objectIdField: "OBJECTID",
            fields: [
              {
                name: "OBJECTID",
                alias: "ObjectId",
                type: "oid",
              },
              {
                name: "TRACKID",
                alias: "TrackId",
                type: "oid",
              }
            ],
    
            timeInfo: {
              trackIdField: "TRACKID"
            },
    
            geometryType: "point",
    
            maxReconnectionAttempts: 100,
            maxReconnectionInterval: 10,
    
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-marker",
                size: "8px",
                color: "gray",
              },
            },
          });
    
          const map = new ArcGISMap({
            basemap: "gray",
            layers: [ layer ]
          });
    
          var view = new MapView({
            container: "viewDiv",
            zoom: 10,
            center: [-74.05, 40.71],
            map,
          });
    
          view.whenLayerView(layer).then(layerView => {
            // Display connection status and current update rate
            const connectionStatusDiv = document.getElementById("connectionStatus");
            const updateRateDiv = document.getElementById("updateRate");
            const info = document.getElementById("info");
    
            layerView.on("update-rate", (updateRate) => {
              updateRateDiv.innerHTML = `${updateRate.client} (${updateRate.websocket} service)`
            })
    
            view.ui.add(info, "top-right");
    
            connectionStatusDiv.style.display = "inline-flex";
            updateRateDiv.style.display = "inline-flex";
    
            layerView.watch("connectionStatus", function(value) {
              if (value === "connected") {
                connectionStatusDiv.style.backgroundColor = "#4e4e4e";
                connectionStatusDiv.innerHTML = "connected";
              } else {
                connectionStatusDiv.style.backgroundColor = "orange";
                connectionStatusDiv.innerHTML = "reconnecting";
              }
            });
          }).catch(e => console.log(e))
        });
      }
    );

    return (
      <div>
        <div id="viewDiv"></div>
        <div id="info"> 
          <div id="connectionStatus" className="esri-widget">Disconnected</div>
          <div id="updateRate" className="esri-widget">0 (0)</div>
        </div>
      </div>);
};