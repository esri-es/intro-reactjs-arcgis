import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Koop = () => {
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
            center: [-2.627198,39.971888],
            zoom: 5
          });
            //definitionExpression: "Version >= 19"
          var featureLayer = new FeatureLayer({
            url: "http://localhost:8080/koop-provider-dgt-datex/rest/services/FeatureServer/0",
            //definitionExpression: "CameraIdentification LIKE '%Madrid%'",
            popupTemplate: {
              title: "Cam: {CameraIdentification}",
              content: [{
                "type": "media",
                "mediaInfos": [{
                  "caption": "",
                  "title": "Camera {OBJECTID}",
                  "type": "image",
                  "refreshInterval": 1,
                  "value": {
                    "linkURL": "{urlLinkAddress}",
                    "sourceURL": "{urlLinkAddress}"
                  }
               }]
              }]
            }
          });
          
          map.add(featureLayer);
        });
        });

    return (
      <div>
        <h3> Mapa de cámaras de la DGT. Datos locales lanzados con <a href="https://koopjs.github.io/" target="_blank">KOOP</a> como servidor.</h3>
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
            center: [-2.627198,39.971888],
            zoom: 5
          {`})`};
          <br />
          var featureLayer = new <b>FeatureLayer</b>{`({`}<br/>
            url: "http://<b>localhost:8080</b>/koop-provider-dgt-datex/rest/services/FeatureServer/0", 
            <br/>
            popupTemplate: popupTemplate
          {`})`};
          <br />
          map.add(featureLayer);
          </code>
        </pre>
        <p>Gracias a Koop estamos creando un servicio "API REST" en nuestro local. Los datos originales tienen un formato XML y a través de Koop los hemos transformado en GeoJSON. <a href="https://github.com/esri-es/koop-provider-dgt-datex" target="_blank">Tutorial</a></p>
      </div>);
};