import React, { Fragment, useState } from 'react';
import { Tabs, Menu } from 'antd';

import '../index.css';
import { Map2d } from '../components/map2d';
import { SimpleMarker } from '../components/simpleMarker';
import { GeoRSS } from '../components/georss';
import { Kml } from '../components/kml';
import { Csv } from '../components/csv';
import { Geojson } from '../components/geojson';
import { KoopDGT } from '../components/koop';
import { Online } from '../components/arcgisOnline';
import { StreamLayer } from '../components/streamLayer';
import { StreamLayerWS } from '../components/streamLayerWS';


// Antd
const { TabPane } = Tabs;

export const TabsComponent = () => {
  const callback = (key) => console.log(key);

  return (
    <Fragment>
      <p>Dependiendo del formato del dato que queremos representar en el mapa usaremos una capa u otra.</p>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Longitud y latitud" key="1">
          <SimpleMarker />
        </TabPane>
        <TabPane tab="KMLLayer" key="2">
          <Kml />
        </TabPane>
        <TabPane tab="CSVLayer" key="3">
          <Csv />
        </TabPane>
        <TabPane tab="GeoJSON" key="4">
          <Geojson />
        </TabPane>
        <TabPane tab="GeoRSS" key="5">
          <GeoRSS />
        </TabPane>
        <TabPane tab="Koop DGT" key="6">
          <KoopDGT />
        </TabPane>
        <TabPane tab="ArcGIS Online" key="7">
          <Online />
        </TabPane>
        <TabPane tab="Stream Layer" key="8">
          <StreamLayer />
        </TabPane>
        <TabPane tab="Stream Layer WebSocket" key="9">
          <StreamLayerWS />
        </TabPane>
        {/* <TabPane tab="Tab 3" key="8">
          <Map2d />
        </TabPane> */}
      </Tabs>
    </Fragment>
  );
}

export default TabsComponent;
