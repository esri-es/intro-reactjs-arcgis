import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';


export const LivingAtlas = ({baseMapSelected}) => {
    if (window.mapLeaflet) window.mapLeaflet.remove();
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules([
          'esri/Map', 'esri/views/MapView', "esri/Graphic", "esri/layers/GraphicsLayer"
        ], { css: true })
        .then(([ArcGISMap, MapView, Graphic, GraphicsLayer]) => {
          const map = new ArcGISMap({
            basemap: baseMapSelected
          });

          new MapView({
            container: mapRef.current,
            map: map,
            center: [-3.704538, 40.416790],
            zoom: 12,
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
      </div>
    );
};