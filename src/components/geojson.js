import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Geojson = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/GeoJSONLayer"], { css: true })
        .then(([ArcGISMap, MapView, GeoJSONLayer]) => {
          const map = new ArcGISMap({
            basemap: 'gray-vector'
          });
        
          new MapView({
            container:  mapRef.current,
            map: map,
            center: [-168, 46],
            zoom: 2,
          });

          var geojsonLayer = new GeoJSONLayer({
            url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
            copyright: "USGS Earthquakes",
            popupTemplate: { title: "Earthquake Info",
            content: "Magnitude {mag} {type} hit {place} on {time}",}
          });
      
          map.add(geojsonLayer)
        });
      }
    );

    return (
      <div>
          <h3> Mapa de terremotos. Datos con formato <a href="https://en.wikipedia.org/wiki/GeoRSS" target="_blank">GeoJSON</a></h3>
        <div className="webmap" ref={mapRef} />
        <br />
        <pre className="prettyprint lang-js code-section">
          <code>
          const map = new ArcGISMap{`({`}
            basemap: 'gray-vector'
          {`})`};
          <br />
          new MapView{`({`}
            container:  mapRef.current,
            map: map,
            center: [-168, 46],
            zoom: 2,
          {`})`};
          <br />
          var geojsonLayer = new <b>GeoJSONLayer</b>{`({`}<br/>
            url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
            copyright: "USGS Earthquakes",
            popupTemplate: popupTemplate
          {`})`};
          <br />
          map.add(geojsonLayer)
          </code>
        </pre>
      </div>);
};