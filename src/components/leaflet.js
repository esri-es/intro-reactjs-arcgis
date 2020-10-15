import React, { useEffect } from 'react';
import { loadModules } from 'esri-loader';

export const Leaflet = () => {
  var L = window.L;
    useEffect(
      () => {
        loadModules([], { css: true })
        .then(([]) => {
          window.mapLeaflet = L.map('leaflet-map').setView([37.75, -122.23], 10);
          L.esri.basemapLayer('Topographic').addTo(window.mapLeaflet);
        });
      }
    );

    return (
      <div>
        <div className="webmap" id="leaflet-map"/>
        <pre className="prettyprint lang-js code-section">
          <code>
            var map = L.map('map').setView([37.75, -122.23], 10);
            <br />
            L.esri.basemapLayer('Topographic').addTo(map);
          </code>
        </pre>        
      </div>
    );
};