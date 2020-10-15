import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const GoogleMapsAPI = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/WebTileLayer"], { css: true })
        .then(([ArcGISMap, MapView, WebTileLayer]) => {
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
            urlTemplate: "https://khms1.googleapis.com/kh?v=877&hl=en-US&x={col}&y={row}&z={level}",
            copyright: 'Map tiles by <a href="http://stamen.com/">Google Maps</a>'
          });
            
          map.add(tiledLayer);
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
              center: [-2.4560712, 36.8383524],
              zoom: 10
            {`})`};
            <br/>
            var tiledLayer = new <b>WebTileLayer</b>{`({`}  <br/>
              urlTemplate: "https://khms1.googleapis.com/kh?v=877&hl=en-US&x={`{`}col{`}`}&y={`{`}row{`}`}&z={`{`}level{`}`}",
              <br/>
              copyright: 'Map tiles by <a href="http://stamen.com/">Google Maps</a>'
            {`})`};
            <br/>
            map.add(tiledLayer);
          </code>
        </pre>        
      </div>
    );
};