import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosLock } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";

const { Text, Title } = Typography;

export default function Profile() {
    return (
        <Row style={{ width: '100vw', height: '90vh', background: '#242424' }}>
            <Col span={10} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', border: '1px solid #2E2E2E' }}>
                <img src='./images/avt.jpg' style={{ height: '350px', width: '350px', borderRadius: '100%' }} alt='avatar'></img>

                <Text style={{ fontSize: '40px', fontWeight: '700px', color: '#FFF' }}>Nguyễn Nhật Sang</Text>

                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '70%' }}>
                    <Button style={{ display: 'flex', width: '60px', height: '60px', background: '#36373A', borderRadius: '100%', justifyContent: 'center', alignItems: 'center', border: 'hidden' }}>
                        <IoIosLock style={{ fontSize: '30', color: '#FFF' }} />
                    </Button>

                    <Button style={{ display: 'flex', width: '60px', height: '60px', background: '#36373A', borderRadius: '100%', justifyContent: 'center', alignItems: 'center', border: 'hidden' }}>
                        <FaUser style={{ fontSize: '25', color: '#FFF' }} />
                    </Button>


                </div>
            </Col>

            <Col span={14} style={{ border: '1px solid #2E2E2E' }}>
                <header>
                    <Title style={{ fontSize: '32px', fontWeight: '700px', color: '#FFF', padding: '30px' }}>Cài đặt</Title>
                </header>
                <body style={{ marginLeft: '30px' }}>

                    <Button style={{ display: 'flex', border: 'hidden', width: '100%', height: '100%', background: '#242424', padding: '10px', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'flex', width: '50px', height: '50px', background: '#0084FE', borderRadius: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <LuPhone style={{ fontSize: '20', color: '#FFF' }} />
                            </div>
                            <Text>Điện thoại</Text>
                        </div>

                        <div>
                            asdas
                        </div>

                    </Button>

                    <Button style={{ display: 'flex', border: 'hidden', width: '100%', height: '100%', background: '#242424', padding: '10px' }}>
                        <div style={{ display: 'flex', width: '50px', height: '50px', background: '#FE294D', borderRadius: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <FaLanguage style={{ fontSize: '30', color: '#FFF' }} />
                        </div>
                        <Text>Ngôn ngữ</Text>
                    </Button>
                    <br style={{ backgroundcolor: "white" }} />
                </body>
            </Col>
        </Row>
    )
}
