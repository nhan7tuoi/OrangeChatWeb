import React from 'react';
import SideBar from './SideBar';
import ChatWindow from './ChatWindow';
import { Col, Row } from 'antd';
import { useSelector,useDispatch } from 'react-redux';

export default function Chat() {
  const user = useSelector((state) => state.auth.user);
  console.log("ChatUser",user);
  return (
    <Row style={{width: '100%', height: '100%', background: '#242424'}}>
      <Col span={6}><SideBar/></Col>
      <Col span={18} style={{width: '100%', height: '100%'}}><ChatWindow/></Col>
    </Row>
  )
}

