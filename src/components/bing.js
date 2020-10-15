import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Bing = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/BingMapsLayer"], { css: true })
        .then(([ArcGISMap, MapView, BingMapsLayer]) => {
          var bing = new BingMapsLayer({
            style: "aerial",
            key: "Am2Xw71vUQ1rQ7oOd3wYa-VyiqzEQB24LwQeRKIBHkm_ObYXmbDxrIlixdSimSKh"
          });
          
          var map = new ArcGISMap({
            basemap: {
              baseLayers: [bing]
            }
          });
          
          new MapView({
            container: mapRef.current,
            map: map,
            zoom: 3,
            center: [0, 45]
          });
        });
      }
    );

    return (
      <div>
        <div className="webmap" ref={mapRef} />
        <br />
        <pre className="prettyprint lang-js code-section">
          <code>
          var bing = new <b>BingMapsLayer</b>{`({`}
            style: "aerial",
            key: privateKey
          {`})`};
          <br />
          var map = new ArcGISMap{`({`}
            basemap: {`{`}
              baseLayers: [bing]
            {`}`}
          {`})`};
          <br />
          new MapView{`({`}
            container: mapRef.current,
            map: map,
            zoom: 3,
            center: [0, 45]
          {`})`};
          </code>
        </pre>        
      </div>
    );
};