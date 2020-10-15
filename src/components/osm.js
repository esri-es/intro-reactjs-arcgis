import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const OSM = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/OpenStreetMapLayer"], { css: true })
        .then(([ArcGISMap, MapView, OpenStreetMapLayer]) => {
          const map = new ArcGISMap({
            basemap: 'topo-vector'
          });
        
          new MapView({
            container:  mapRef.current,
            map: map,
            center: [-3.704538, 40.416790],
            zoom: 12,
          });

          var osmLayer = new OpenStreetMapLayer();
          map.add(osmLayer);
        });
      }
    );

    return (
      <div>
        <div className="webmap" ref={mapRef} />
        <br />
        <pre className="prettyprint lang-js code-section">
          <code>
            const map = new ArcGISMap{`({`}  <br/>
              basemap: 'topo-vector'
            {`})`};
            <br/>
            new MapView{`({`}  <br/>
              container:  mapRef.current,
              map: map,
              center: [-3.704538, 40.416790],
              zoom: 12,
            {`})`};
            <br/>
            var osmLayer = new <b>OpenStreetMapLayer</b>();
            <br/>
            map.add(osmLayer);
          </code>
        </pre>        
      </div>
    );
};