import React from 'react'
import { Button, Col, Flex, Row, Typography } from 'antd'
import { BsChatFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { FaPhoneSquareAlt, FaUser } from "react-icons/fa";
import SideBar from './SideBar';
import ChatWindow from './ChatWindow';

const { Text, Title } = Typography;

export default function Chat() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#242424' }}>
      <Row>
        <Col span={6}><SideBar /></Col>
        <Col span={18}><ChatWindow /></Col>
      </Row>
      <Row justify='center' style={{background: '#1B1B1B', height: '8.5%', alignItems: 'center'}}>
        <Col span={8}>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
          <BsChatFill style={{fontSize: '32', margin: '10', color: '#F24E1E'}} />
          <HiUsers style={{fontSize: '35', margin: '10', color: '#36373A'}} />
          <FaPhoneSquareAlt style={{fontSize: '35', margin: '10', color: '#36373A'}} />
          <FaUser style={{fontSize: '35', margin: '10', color: '#36373A'}} />
      </div>
        </Col>
      </Row>
      
    </div>

  )
}
