import React, { useEffect } from 'react';
import SideBar from './SideBar';
import ChatWindow from './ChatWindow';
import { Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ChatWelcome from './ChatWelcome';
import connectSocket from '../../server/ConnectSocket';

export default function ChatGroup() {
  const conversation1 = JSON.parse(localStorage.getItem('conversation1'));
  const hi = JSON.parse(localStorage.getItem('hi'));
  const currentPage = useSelector(state => state.current.currentPage2);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    console.log('connect');
    connectSocket.initSocket(user._id);
    console.log('connect');
  }, []);
  return (
    <Row style={{ width: '100%', height: '100%', background: '#242424' }}>
      <Col span={6}><SideBar /></Col>
      {/* {currentPage === 'ChatWelcome' &&<Col span={18}>  <ChatWelcome /></Col>}
      {currentPage === 'ChatWindow' &&<Col span={18}>  <ChatWindow /></Col>} */}

      {conversation1 == null ?
        currentPage === 'ChatWelcome' && <Col span={18}>  <ChatWelcome /></Col>
        :
        currentPage === 'ChatWindow' && <Col span={18}>  <ChatWindow /></Col>
      }
    </Row>
  )
}

