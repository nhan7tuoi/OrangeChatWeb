import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';

const { Text, Title } = Typography;

export default function Friend() {
    const user = useSelector((state) => state.auth.user);
    return (
        <Row style={{ width: '100vw', height: '90vh', background: '#242424' }}>
            <Col span={14} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #2E2E2E' }}>
                <header style={{ fontSize: '40px', fontWeight: '700', color: '#FFF' }}>Danh sách bạn bè</header>

                <Button style={{ display: 'flex', border: 'hidden', width: '100%', height: '10%', background: '#242424', padding: '20px', alignItems: 'center', justifyContent: 'space-evenly' }}>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src='./images/avt.jpg' style={{ height: '70px', width: '70px', borderRadius: '100%' }} alt='avatar'></img>
                        <Text style={{ marginLeft: '20px', color: 'white', fontSize: '30px' }}>Nguyễn Nhật Sang</Text>
                    </div>
                    <div style={{ width: '100%' }}></div>
                    <Button style={{ display: 'flex', width: '60px', height: '60px', background: '#36373A', borderRadius: '100%', justifyContent: 'center', alignItems: 'center', border: 'hidden' }}>

                        <MdDelete style={{ fontSize: '30', color: '#FFF' }} />
                    </Button>

                </Button>
            </Col>

            <Col span={10} style={{ border: '1px solid #2E2E2E', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <header>
                    <Title style={{ fontSize: '32px', fontWeight: '700', color: '#FFF', marginLeft: '40px' }}>Tìm kiếm bạn bè</Title>
                </header>
                <body style={{ marginTop: '50px', marginLeft: 20, width: '90%' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#36373A', paddingLeft: '10px', width: '100%', borderRadius: '8px' }}>
                        <IoIosSearch style={{ fontSize: '18', color: '#FFF' }} />
                        <input type='text' placeholder='Tìm kiếm' style={{ width: '90%', height: '40px', background: '#36373A', marginLeft: '5px', border: 'hidden', outline: 'none', color: '#FFF', borderRadius: '10px' }}></input>
                    </div>

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
