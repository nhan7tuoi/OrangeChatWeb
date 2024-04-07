import { Col, Row, Typography } from 'antd'
import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { BsCameraVideo, BsImage } from "react-icons/bs";
import { FaRegSquarePlus, FaUserLarge } from "react-icons/fa6";
import { HiBell } from "react-icons/hi";
import { AiFillCamera } from "react-icons/ai";
import { FaSmile } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

const { Text, Title } = Typography;

export default function ChatWindow() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            {/* <img src='./images/Hello.svg' style={{ height: '300px', width: '100%' }}></img>
            <Text style={{fontSize: '32px', fontWeight: '700', color: '#F24E1E'}}>Chào mừng đến với OrangeC Web</Text>
            <Text style={{fontSize: '20px', fontWeight: '700px', color: '#FFF', textAlign: 'center'}}>Khám phát những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hóa cho máy tính của bạn.</Text> */}


            <Row style={{height: '100%', width: '100%'}}>
                <Col span={18}>
                    <div style={{ borderColor: '#2E2E2E', border: '1px solid #2E2E2E', width: '100%', height: '100%' }}>
                        <div style={{ display: 'flex', margin: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: "65px", height: "7vh", position: "relative" }}>
                                    <img src='./images/avt.jpg' style={{ width: "100%", height: "100%", borderRadius: '100%' }} />
                                    <div style={{ position: "absolute", width: "10px", height: "10px", backgroundColor: "#F24E1E", borderRadius: "100%", bottom: 0, right: 10, borderColor: '#FFF', border: '1px solid #FFF' }}></div>
                                </div>

                                <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ fontSize: '20px', fontWeight: '800px', color: '#FFF', width: '100%' }}>Nguyễn Nhật Sang</Text>
                                    <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#666', width: '100%' }}>Đang hoạt động</Text>
                                </div>
                            </div>
                            <div>
                                <IoSearchSharp style={{fontSize: '20', margin: '10', color: '#FFF'}} />
                                <LuPhone style={{fontSize: '20', margin: '10', color: '#FFF'}} />
                                <BsCameraVideo style={{fontSize: '20', margin: '10', color: '#FFF'}} />
                                <FaRegSquarePlus style={{fontSize: '20', margin: '10', color: '#FFF'}} />
                            </div>
                        </div>

                        <div style={{ background: '#1B1B1B', width: '100%', height: '80%' }}>

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <AiFillCamera style={{fontSize: '50', margin: '10', color: '#F24E1E'}} />
                            <BsImage style={{fontSize: '40', margin: '10', color: '#F24E1E'}} />
                            <div style={{ display: 'flex', background: '#36373A', borderRadius: '25px', justifyContent: 'space-between', alignaItems: 'center', width: '100%', margin: '10px' }}>
                                <input type='text' placeholder='Nhập tin nhắn' style={{ background: '#36373A', border: 'hidden', fontSize: '18px', outline: 'none', marginLeft: '20px', color: '#FFF' }}></input>
                                <FaSmile style={{fontSize: '30', margin: '10', color: '#F24E1E'}} />
                            </div>
                            <BiSolidLike style={{fontSize: '50', margin: '10', color: '#F24E1E'}} />
                        </div>
                    </div>

                </Col>

                <Col span={6} style={{display: 'flex', flexDirection: 'column', height: '90vh'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', height: '45%', borderColor: '#2E2E2E', border: '1px solid #2E2E2E'}}>
                        <img src='./images/avt.jpg' style={{ width: "150px", height: "150px", borderRadius: '100%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                            <Text style={{ fontSize: '20px', fontWeight: '800px', color: '#FFF', width: '100%' }}>Nguyễn Nhật Sang</Text>
                            <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#F24E1E', width: '100%' }}>Đang hoạt động</Text>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
                            <div style={{ display: 'flex',width: '60px', height: '60px', background: '#36373A', borderRadius: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <HiBell style={{fontSize: '30', color: '#FFF'}} />
                            </div>

                            <div style={{ display: 'flex', width: '60px', height: '60px', background: '#36373A', borderRadius: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <FaUserLarge style={{fontSize: '25', color: '#FFF'}} />
                            </div>


                        </div>
                    </div>

                    <div style={{paddingLeft: '5px', borderColor: '#2E2E2E', border: '1px solid #2E2E2E', height: '55vh', padding:'20px'}}>
                        <Text style={{color: '#FFF', fontSize: '20px', fontWeight: '700'}}>File, phương tiện và liên kết</Text>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
