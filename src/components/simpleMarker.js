import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const SimpleMarker = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules(['esri/Map', 'esri/views/MapView', "esri/Graphic", "esri/layers/GraphicsLayer"], { css: true })
        .then(([ArcGISMap, MapView, Graphic, GraphicsLayer]) => {
          const map = new ArcGISMap({
            basemap: 'topo-vector'
          });
        
          new MapView({
            container:  mapRef.current,
            map: map,
            center: [-3.704538, 40.416790],
            zoom: 15,
          });
    
          var graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          
          var point = {
            type: "point",
            x: -3.704538,
            y: 40.416790
          };
          
          var pointGraphic = new Graphic({
            geometry: point,
            popupTemplate: {
              title: 'Título popup',
              content: 'Puerta del Sol'
            }
          });
          
          graphicsLayer.add(pointGraphic);
        });
      }
    );

    return (
      <div>
        <div className="webmap" ref={mapRef} />
        <br/>
        <pre className="prettyprint lang-js code-section">
          <code>
            const map = new ArcGISMap{`({`}
              basemap: 'topo-vector'
            {`})`};
            <br/>
            new MapView{`({`}
              container:  mapRef.current,
              map: map,
              center: [-3.704538, 40.416790],
              zoom: 15,
              {`})`};
            <br/>

            var graphicsLayer = new GraphicsLayer();
            <br/>
            map.add(graphicsLayer);
            <br/>

            var point = {`{`}
              type: "point",
              x: -3.704538,
              y: 40.416790
            {`}`};
            <br/>
            var pointGraphic = new <b>Graphic</b>{`({`}
              geometry: point,
              popupTemplate: {`{`}
                title: 'Título popup',
                content: 'Puerta del Sol'
              {`}`}
            {`})`};
            <br/>

            graphicsLayer.add(pointGraphic);
          </code>
        </pre>
      </div>);
};