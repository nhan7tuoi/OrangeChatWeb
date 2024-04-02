import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosLock } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const { Text, Title } = Typography;

export default function Friend() {
    return (
        <Row style={{ width: '100vw', height: '90vh', background: '#242424' }}>
            <Col span={10} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', border: '1px solid #2E2E2E' }}>
                <img src='./images/avt.jpg' style={{ height: '350px', width: '350px', borderRadius: '100%' }} alt='avatar'></img>

                <Text style={{ fontSize: '40px', fontWeight: '700', color: '#FFF' }}>Nguyễn Nhật Sang</Text>

                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '70%', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button style={{ display: 'flex', width: '60px', height: '60px', background: '#36373A', borderRadius: '100%', justifyContent: 'center', alignItems: 'center', border: 'hidden' }}>

                            <MdDelete style={{ fontSize: '30', color: '#FFF' }} />
                        </Button>
                        <Text style={{ color: 'white', marginTop: '20px' }}>Xóa</Text>
                    </div>





                </div>
            </Col>

            <Col span={14} style={{ border: '1px solid #2E2E2E' }}>
                <header>
                    <Title style={{ fontSize: '32px', fontWeight: '700', color: '#FFF', marginLeft: '40px' }}>Danh bạ</Title>
                </header>
                <body style={{ marginTop: '50px', marginLeft: 20 }}>

                    <Button style={{ display: 'flex', border: 'hidden', width: '100%', height: '100%', background: '#242424', padding: '20px', alignItems: 'center', justifyContent: 'space-evenly' }}>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src='./images/avt.jpg' style={{ height: '32px', width: '32px', borderRadius: '100%' }} alt='avatar'></img>
                            <Text style={{ marginLeft: '20px', color: 'white' }}>Nguyễn Nhật Sang</Text>
                        </div>
                        <div style={{ width: '100%' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={{ marginLeft: '20px', color: 'white' }}>000000000000000</Text>

                        </div>

                    </Button>
                    <Button style={{ display: 'flex', border: 'hidden', width: '100%', height: '100%', background: '#242424', padding: '20px', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src='./images/avt.jpg' style={{ height: '32px', width: '32px', borderRadius: '100%' }} alt='avatar'></img>
                            <Text style={{ marginLeft: '20px', color: 'white' }}>Võ Trọng Tài</Text>
                        </div>
                        <div style={{ width: '100%' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={{ marginLeft: '20px', color: 'white' }}>Tiếng Việt</Text>


                        </div>





                    </Button>

                    {/* <Button style={{ display: 'flex', border: 'hidden', width: '100%', height: '100%', background: '#242424', padding: '10px' }}>
                        <div style={{ display: 'flex', width: '50px', height: '50px', background: '#FE294D', borderRadius: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <FaLanguage style={{ fontSize: '30', color: '#FFF' }} />
                        </div>
                        <Text>Ngôn ngữ</Text>
                    </Button> */}
                    <br style={{ backgroundcolor: "white" }} />
                </body>
            </Col>
        </Row>
    )
}
