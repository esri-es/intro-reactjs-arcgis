import React, { Fragment, useState } from 'react';
import { Tabs, Select } from 'antd';
import '../index.css';

import { LivingAtlas } from '../components/livingAtlas';
import { GoogleMapsAPI } from '../components/googleMaps';
import { OSM } from '../components/osm';
import { Mapbox } from '../components/mapbox';
import { Stamen } from '../components/stamen';
import { Leaflet } from '../components/leaflet';
import { Bing } from '../components/bing';
import { Carto } from '../components/carto';

// ANTD
const { Option } = Select;
const { TabPane } = Tabs;

export const BaseMapComponent = () => {
  const [baseMap, setBaseMap] = useState('topo')
  const callback = (key) => console.log(key);
  
  const handleChange = (value)  => setBaseMap(value);
  return (
    <Fragment>
      <p>Integrar diferentes mapas base</p>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Living Atlas (ArcGIS)" key="1">
          <Select defaultValue="Topo" style={{ width: 120 }} onChange={handleChange} className="select-base-map">
            <Option value="dark-gray-vector"> Dark-gray-vector</Option>
            <Option value="topo-vector">Topo-vector</Option>
            <Option value="streets-vector">Streets-vector</Option>
            <Option value="streets">Streets</Option>
            <Option value="satellite">Satellite</Option>
            <Option value="hybrid">Hybrid</Option>
            <Option value="dark-gray">Dark-gray</Option>
            <Option value="gray">Gray</Option>
            <Option value="national-geographic">National-geographic</Option>
            <Option value="oceans">Oceans</Option>
            <Option value="osm">Open Street Map Layer</Option>
            <Option value="terrain">Terrain</Option>
            <Option value="gray-vector">Gray-vector</Option>
            <Option value="national-geographic">National-geographic</Option>
            <Option value="Streets-vector">Streets-vector</Option>
            <Option value="streets-navigation-vector">Streets-navigation-vector</Option>
            <Option value="streets-relief-vector">Streets-relief-vector</Option>
          </Select>
          <LivingAtlas baseMapSelected={baseMap}/>
        </TabPane>
        <TabPane tab="Google API" key="2">
          <GoogleMapsAPI />
        </TabPane>
        <TabPane tab="Open Street Map" key="3">
          <OSM />
        </TabPane>
        <TabPane tab="Mapbox*" key="4">
          <Mapbox />
        </TabPane>
        <TabPane tab="Stamen" key="5">
          <Stamen />
        </TabPane>
        <TabPane tab="Leaflet" key="6">
          <Leaflet />
        </TabPane>
        <TabPane tab="Bing" key="7">
          <Bing />
        </TabPane>
        <TabPane tab="Carto*" key="8">
          <Carto />
        </TabPane>
      </Tabs>
    </Fragment>
  );
}

export default BaseMapComponent;
