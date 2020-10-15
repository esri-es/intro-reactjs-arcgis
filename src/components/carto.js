import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Carto = () => {
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
        var tiledLayer = new WebTileLayer({
          urlTemplate: "https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/${level}/${col}/${row}.png",
      
          copyright: '&copy; <a href="https://cartodb.com/attributions">CartoDB</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
          }
        );
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