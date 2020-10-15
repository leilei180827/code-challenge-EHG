import React from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default function Tab(props) {
  
  const callback = (key) => {
    props.handleImageTypeTab(key)
  };
  return (
    <Tabs defaultActiveKey="1" onChange={callback} centered style={{textAlign:"center"}}>
      <TabPane tab="default" key="default"  >
        <p>simply bind colors and pixels by sequences when they're produced</p>
      </TabPane>
      <TabPane tab="rgb" key="rgb" data-testid="rgb">
        <p>sort colors by <strong>RGB</strong> distance to rgb(8,8,8)</p>
        <p>sort pixel's index by spatial distance to top-left corner</p>
        <p>bind colors and pixels according to their sorted sequences</p>
      </TabPane>
      <TabPane tab="gray" key="gray">
        <p>sort colors by <strong>gray level</strong> distance to rgb(8,8,8)</p>
        <p>others are same as mentioned in 'rgb'</p>
      </TabPane>
      <TabPane tab="hsv" key="hsv">
        <p>sort colors by <strong>hsv</strong> distance to rgb(8,8,8)</p>
        <p>others are same as mentioned in 'rgb'</p>
      </TabPane>
      <TabPane tab="gradual-rgb-corner" key="gradual-rgb">
        <p>sort pixel's index by spatial distance to top-left corner of the image </p>
        <p>gradually choose the most suitable color based on colors of adjacent drawn pixels for empty ones</p>
      </TabPane>
      <TabPane tab="gradual-rgb-middle" key="gradual-rgb-middle">
        <p>sort pixel's index by spatial distance to middle of the image</p>
        <p>others are same as mentioned in 'gradual-rgb-corner'</p>
      </TabPane>
    </Tabs>
  );
}
