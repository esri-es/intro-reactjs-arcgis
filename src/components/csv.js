import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Csv = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/CSVLayer"], { css: true })
        .then(([ArcGISMap, MapView, CSVLayer]) => {  
          var map = new ArcGISMap({
            basemap: "dark-gray-vector",
          });
  
          new MapView({
            container: mapRef.current,
            map: map,
            zoom: 4,
            center: [-102.552784, 23.634501]
          });

          var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv";

          var csvLayer = new CSVLayer({
            url: url,
            popupTemplate: {
              title: "{place}",
              content: [
                {
                  type: "text",
                  text:
                    "{longitude}, {latitude}"
                },
              ]}
           });
           map.add(csvLayer);
        });
      }
    );

    return (
      <div>
        <h3>Mapa mundial de terremotos. Datos con formato <a href="https://en.wikipedia.org/wiki/Comma-separated_values">CSV</a></h3>
        <div className="webmap" ref={mapRef} />
        <br />
        <pre className="prettyprint lang-js code-section">
          <code>
          var map = new ArcGISMap{`({`}
            basemap: "dark-gray-vector",
          {`})`};
          <br />
          new MapView{`({`}
            container: mapRef.current,
            map: map,
            zoom: 4,
            center: [-102.552784, 23.634501]
          {`})`};
          <br />
          var csvLayer = new <b>CSVLayer</b>{`({`}
            url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv";
          {`})`};
          <br />
           map.add(csvLayer);
          </code>
        </pre>
      </div>);
};