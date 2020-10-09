import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const GeoRSS = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/GeoRSSLayer", "esri/config"], { css: true })
        .then(([ArcGISMap, MapView, GeoRSSLayer]) => {
          const map = new ArcGISMap({
            basemap: 'topo-vector'
          });
        
          new MapView({
            container:  mapRef.current,
            map: map,
            zoom: 2,
          });

          const layer = new GeoRSSLayer({
            url: "https://disasterscharter.org/charter-portlets/cpi-mvc/activations/feed/rss/"
          });
      
          map.add(layer)
        });
      }
    );

    return (
      <div>
          <h3> Mapa de desastres naturales. Datos con formato <a href="https://en.wikipedia.org/wiki/GeoRSS" target="_blank">GeoRSS</a></h3>
        <div className="webmap" ref={mapRef} />
        <br />
        <pre className="prettyprint lang-js code-section">
          <code>
          const map = new ArcGISMap{`({`}
            basemap: 'topo-vector'
          {`})`};
          <br />
          new MapView{`({`}
            container:  mapRef.current,
            map: map,
            zoom: 2,
          {`})`};
          <br />
          const layer = new <b>GeoRSSLayer</b>{`({`}
            url: "https://disasterscharter.org/charter-portlets/cpi-mvc/activations/feed/rss/"
          {`})`};
          <br />
          map.add(layer)
          </code>
        </pre>
      </div>);
};