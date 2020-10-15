import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const StreamLayer = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/StreamLayer"], { css: true })
        .then(([ArcGISMap, MapView, StreamLayer]) => {
          const map = new ArcGISMap({
            basemap: 'streets-navigation-vector'
          });
        
          new MapView({
            container:  mapRef.current,
            map: map,
            center: [-117.805, 34.027],
            zoom: 8
          });

          const streamLayer = new StreamLayer({
            url: "https://geoeventsample1.esri.com:6443/arcgis/rest/services/LABus/StreamServer",
            purgeOptions: {
              displayCount: 100 // Controla el max nº de llamadas
            }
          });
          map.add(streamLayer);
          
        });
      }
    );

    return (
      <div>
        <h3>StreamLayer de los autobuses de LA basándose en <a href="https://enterprise.arcgis.com/es/geoevent/latest/get-started/what-is-arcgis-geoevent-server.htm" target="_blank">ArcGIS GeoEvent Server </a></h3>
        <div className="webmap" ref={mapRef} />
        <br />
        <pre className="prettyprint lang-js code-section">
          <code>
          const map = new ArcGISMap{`({`}
            basemap: 'streets-navigation-vector'
          {`})`};
          <br />
          new MapView{`({`}
            container:  mapRef.current,
            map: map,
            center: [-100.805, 34.027],
            zoom: 6
          {`})`};
          <br />
          var streamLayer = new <b>StreamLayer</b>{`({`}<br/>
          url: "https://geoeventsample1.esri.com:6443/arcgis/rest/services/LABus/StreamServer",
            purgeOptions: {`{`}
              displayCount: 100
            {`}`}
          {`})`};
          <br />
          map.add(streamLayer);
          </code>
        </pre>
      </div>);
};