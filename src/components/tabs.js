import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import '../index.css';
import { Map2d } from './map2d';
import { SimpleMarker } from './simpleMarker';
import { GeoRSS } from './georss';
import { Kml } from './kml';
import { Csv } from './csv';
import { Geojson } from './geojson';
import { Koop } from './koop';

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
        <TabPane tab="Koop" key="6">
          <Koop />
        </TabPane>
        <TabPane tab="ArcGIS Online / Feature Layer" key="7">
        </TabPane>
        {/* <TabPane tab="Tab 3" key="8">
          <Map2d />
        </TabPane> */}
      </Tabs>
    </Fragment>
  );
}

export default TabsComponent;
