import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const Heatmap = () => {
    const mapRef = useRef();
    useEffect(
      () => {
        loadModules([
        "esri/Map",
        "esri/layers/CSVLayer",
        "esri/views/MapView",
        "esri/widgets/Legend"], { css: true })
        .then(([ArcGISMap, CSVLayer, MapView, Legend]) => {
          const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv";

        // Paste the url into a browser's address bar to download and view the attributes
        // in the CSV file. These attributes include:
        // * mag - magnitude
        // * type - earthquake or other event such as nuclear test
        // * place - location of the event
        // * time - the time of the event

        const template = {
          title: "{place}",
          content: "Magnitude {mag} {type} hit {place} on {time}."
        };

        // The heatmap renderer assigns each pixel in the view with
        // an intensity value. The ratio of that intensity value
        // to the maxPixel intensity is used to assign a color
        // from the continuous color ramp in the colorStops property

        const renderer = {
          type: "heatmap",
          colorStops: [
            { color: "rgba(63, 40, 102, 0)", ratio: 0 },
            { color: "#472b77", ratio: 0.083 },
            { color: "#4e2d87", ratio: 0.166 },
            { color: "#563098", ratio: 0.249 },
            { color: "#5d32a8", ratio: 0.332 },
            { color: "#6735be", ratio: 0.415 },
            { color: "#7139d4", ratio: 0.498 },
            { color: "#7b3ce9", ratio: 0.581 },
            { color: "#853fff", ratio: 0.664 },
            { color: "#a46fbf", ratio: 0.747 },
            { color: "#c29f80", ratio: 0.83 },
            { color: "#e0cf40", ratio: 0.913 },
            { color: "#ffff00", ratio: 1 }
          ],
          maxPixelIntensity: 25,
          minPixelIntensity: 0
        };

        const layer = new CSVLayer({
          url: url,
          title: "Magnitude 2.5+ earthquakes from the last week",
          copyright: "USGS Earthquakes",
          //popupTemplate: template,
          renderer: renderer // Utilizando la escala de arriba (mapa y leyenda)
        });

        const map = new ArcGISMap({
          basemap: "gray-vector",
          layers: [layer]
        });

        const view = new MapView({
          container: mapRef.current,
          center: [-138, 30],
          zoom: 2,
          map: map
        });

        view.ui.add(
          new Legend({
            view: view
          }),
          "bottom-left"
        );
        });
      }
    );

    return (
      <div>
        <div className="webmap" ref={mapRef} />
        <br/>
        <pre className="prettyprint lang-js code-section">
          <code>
            const renderer = {`{`}<br/>
              type: "heatmap",<br/>
              colorStops: [ <br/>
                {`{`} color: "rgba(63, 40, 102, 0)", ratio: 0 {`}`},<br/>
                {`{`} color: "#472b77", ratio: 0.083 {`}`},<br/>
                ...<br/>
              ],<br/>
              maxPixelIntensity: 25,<br/>
              minPixelIntensity: 0<br/>
            {`}`};
            <br/>
            const layer = new CSVLayer{`({`}<br/>
              url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",<br/>
              title: "Magnitude 2.5+ earthquakes from the last week",<br/>
              copyright: "USGS Earthquakes",<br/>
              renderer: renderer <br/>
            {`})`};
            <br/>
            const map = new ArcGISMap{`({`}<br/>
              basemap: "gray-vector",<br/>
              layers: [layer]<br/>
            {`})`};
            <br/>
            const view = new MapView{`({`}<br/>
              container: mapRef.current,<br/>
              center: [-138, 30],<br/>
              zoom: 2,<br/>
              map: map<br/>
            {`})`};
            <br/>
          </code>
        </pre>
      </div>);
};