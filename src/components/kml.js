import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Kml = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/KMLLayer"], { css: true })
        .then(([ArcGISMap, MapView, KMLLayer]) => {
          var layer = new KMLLayer({
            url:
              "https://earthquake.usgs.gov/fdsnws/event/1/query?format=kml&minmagnitude=5.8"
          });
  
          var map = new ArcGISMap({
            basemap: "dark-gray-vector",
            layers: [layer]
          });
  
          new MapView({
            container: mapRef.current,
            map: map
          });
        });
      }
    );

    return (
      <div>
          <h3>Mapa mundial de terremotos mayores de 5,8. Datos con formato <a href="https://en.wikipedia.org/wiki/Keyhole_Markup_Language" target="_blank">KML</a></h3>
        <div className="webmap" ref={mapRef} />
        <br />
        <pre className="prettyprint lang-js code-section">
          <code>
          var layer = new <b>KMLLayer</b>{`({`}
            url:
              "https://earthquake.usgs.gov/fdsnws/event/1/query?format=kml&minmagnitude=5.8"
          {`})`};
          <br />
          var map = new ArcGISMap{`({`}
            basemap: "dark-gray-vector",
            layers: [layer]
          {`})`};
          <br />
          new MapView{`({`}
            container: mapRef.current,
            map: map
          {`})`};
          </code>
        </pre>
      </div>);
};