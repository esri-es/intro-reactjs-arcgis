import React from 'react';
import { Tabs } from 'antd';
import '../index.css';

import { Cluster } from '../components/cluster';
import { Heatmap } from '../components/heatmap';
// ANTD
const { TabPane } = Tabs;

export const OherMaps = () => {
  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab="Cluster" key="1">
        <Cluster />
      </TabPane>
      <TabPane tab="Heatmap" key="2">
        <Heatmap />
      </TabPane>
    </Tabs>
  );
}
