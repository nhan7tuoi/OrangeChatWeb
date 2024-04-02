import React from 'react';
import SideBar from './SideBar';
import ChatWindow from './ChatWindow';
import { Col, Row } from 'antd';

export default function Chat() {
  return (
    <Row style={{width: '100%', height: '100%', background: '#242424'}}>
      <Col span={6}><SideBar/></Col>
      <Col span={18}><ChatWindow/></Col>
    </Row>
  )
}

