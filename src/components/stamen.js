import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Stamen = () => {
  const mapRef = useRef();

  useEffect(
    () => {
      loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/WebTileLayer"], { css: true })
      .then(([ArcGISMap, MapView, WebTileLayer]) => {
        var map = new ArcGISMap();
        
        new MapView({
          container:  mapRef.current,
          map: map,
          center: [-3.704538, 40.416790],
          zoom: 12,
        });

        var mapBaseLayer = new WebTileLayer({
          urlTemplate: "http://{subDomain}.tile.stamen.com/watercolor/{level}/{col}/{row}.png",
          subDomains: ["a", "b", "c", "d"],
          copyright: "Map tiles by <a href=\"http://stamen.com/\">Stamen Design</a>, " +
            "under <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a>. " +
            "Data by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>, " +
            "under <a href=\"http://creativecommons.org/licenses/by-sa/3.0\">CC BY SA</a>."
        });
          
        map.add(mapBaseLayer);
    }
  )});
  return (
    <div>
      <div className="webmap" ref={mapRef}></div>   
      <pre className="prettyprint lang-js code-section">
          <code>
          var map = new ArcGISMap();
          <br />
          new MapView{`({`}
            container:  mapRef.current,
            map: map,
            center: [-3.704538, 40.416790],
            zoom: 12,
          {`})`};
          <br />
          var mapBaseLayer = new <b>WebTileLayer</b>{`({`}<br />
            urlTemplate: "http://{`{`}subDomain{`}`}.tile.stamen.com/watercolor/{`{`}level{`}`}/{`{`}col{`}`}/{`{`}row{`}`}.png"
          {`})`};
          <br />
          map.add(mapBaseLayer);
          </code>
        </pre>    
    </div>
  );
};