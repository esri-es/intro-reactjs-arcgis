import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Online = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/FeatureLayer"], { css: true })
        .then(([ArcGISMap, MapView, FeatureLayer]) => {
          const map = new ArcGISMap({
            basemap: 'streets-navigation-vector'
          });
          
          new MapView({
            container: mapRef.current,
            map: map,
            center: [-118.805, 34.027],
            zoom: 10
          });
          var featureLayer = new FeatureLayer({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
          });
          
          map.add(featureLayer);
        });
        });

    return (
      <div>
        <h3> Mapa de rutas en LA. Datos del servidor de <a href="https://www.arcgis.com/index.html">ArcGIS Online</a></h3>
        <div className="webmap" ref={mapRef} />
        <br />
        <pre className="prettyprint lang-js code-section">
          <code>
          const map = new ArcGISMap{`({`}
            basemap: 'streets-navigation-vector'
          {`})`};
          <br />
          new MapView{`({`}
          container: mapRef.current,
            map: map,
            center: [-118.805, 34.027],
            zoom: 10
          {`})`};
          <br />
          var featureLayer = new <b>FeatureLayer</b>{`({`}<br/>
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
          {`})`};
          <br />
          map.add(featureLayer);
          </code>
        </pre>
      </div>);
};