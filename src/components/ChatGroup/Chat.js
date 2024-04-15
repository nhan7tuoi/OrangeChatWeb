import React, { useEffect } from 'react';
import SideBar from './SideBar';
import ChatWindow from './ChatWindow';
import { Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ChatWelcome from './ChatWelcome';
import { setCurrentPage } from '../../redux/currentSlice';

export default function ChatGroup() {
  const user = useSelector((state) => state.auth.user);
  const currentPage = useSelector(state => state.current.currentPage);
  // console.log("Current", currentPage);
  console.log("ChatUser", user);
  return (
    <Row style={{ width: '100%', height: '100%', background: '#242424' }}>
      <Col span={6}><SideBar /></Col>
      {currentPage === 'ChatWelcome' &&<Col span={18}>  <ChatWelcome /></Col>}
      {currentPage === 'ChatWindow' &&<Col span={18}>  <ChatWindow /></Col>}
    </Row>
  )
}

