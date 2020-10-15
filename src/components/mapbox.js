import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Mapbox = () => {
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  const mapRef = useRef();

  useEffect(
    () => {
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/WebTileLayer'], { css: true })
      .then(([ArcGISMap, MapView, WebTileLayer]) => {
        // mapboxgl.accessToken = 'pk.eyJ1IjoibGliZXJ0YWRjYyIsImEiOiJja2c5MjVrbTUwZTN4MzFtcWVyaGdldHl1In0.EeGFrs9B-2opFMbohd7pqg';
        // new mapboxgl.Map({
        //   container: "map",
        //   style: 'mapbox://styles/mapbox/streets-v11'
        // });

        const map = new ArcGISMap({
          basemap: 'topo-vector'
        });
      
        new MapView({
          container:  mapRef.current,
          map: map,
          center: [-3.704538, 40.416790],
          zoom: 12,
        });
        
        var token = "pk.eyJ1IjoiaGhrYW9zIiwiYSI6IjAzdXhyTXMifQ.dmTOV4S7Z2PnWIl702epbA";

        var tiledLayer = new WebTileLayer({
          urlTemplate: "https://${subDomain}.tiles.mapbox.com/v4/mapbox.satellite/${level}/${col}/${row}.png?access_token=" + token,
          copyright: "Mapbox",
          id: "Open Cycle Map",
          subDomains: ["a", "b", "c"]
        });
          
        map.add(tiledLayer);
      });
    }
  );
  return (
    <div>  
      <div id="map" className="webmap" ref={mapRef} />
    </div>
  );
};