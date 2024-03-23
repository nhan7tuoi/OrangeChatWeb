import { Button, Col, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";

const users = [
    {
        username: "0123456789",
        password: "123aaa"
    },
    {
        username: "0987654321",
        password: "abcabc"
    },
]



const { Text, Title } = Typography;

export default function Login() {
    const [error, setError] = useState("");

    const [data, setData] = useState({
      username: '',
      password: ''
    });

    let navigate = useNavigate();
        
    const checkUser = () => {
      const usercheck = users.find(user => (data.username === user.username && data.password === user.password));
      if(usercheck) {
        navigate('/chat');
      }else {
        setError("Sai số điện thoại hoặc mật khẩu!");
      }
    }

    const changeHandler = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      checkUser();
      console.log(checkUser());
    }


    return (
        <div style={{ background: '#1D1D1D', width: '100vw', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, fontWeight: 800, color: '#F24E1E', padding: 50 }}>OrangeC</Text>
                <Link to='/register' style={{ fontSize: 17, fontWeight: 800, color: '#FFF', padding: 50 }}>Đăng ký</Link>
            </div>
            <div>
                <div style={{ padding: 80 }}>
                    <div name="form">
                        <Row justify='center'>
                            <Col span={8} style={{ alignItems: 'center' }}>
                                <Title style={{ color: '#FFFFFF', textAlign: 'center' }}>Đăng nhập</Title>

                                <input value={data.username} onChange={changeHandler} type='text' placeholder='Số điện thoại' name='username'
                                    style={{ backgroundColor: '#2E2E2E', width: '100%', height: 60, borderRadius: '10px', fontSize: '18px', marginTop: '80px', padding: '15px', color: '#FFF' }}></input>


                                <input value={data.password} onChange={changeHandler} type='password' name='password' placeholder='Mật khẩu' style={{  backgroundColor: '#2E2E2E', width: '100%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>

                                <Text style={{ color: 'red', fontSize: '18px' }}>{error}</Text>

                                <Button onClick={handleSubmit} style={{ width: '100%', height: '60px', fontSize: '24px', fontWeight: '800px', color: '#FFFFFF', backgroundColor: '#F24E1E', borderColor: '#F24E1E', marginTop: '30px' }}>
                                    Đăng nhập
                                </Button>

                                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <input type='checkbox' style={{ color: '#F24E1E', borderColor: '#F24E1E' }}></input>
                                        <Text style={{ color: '#FFFFFF59', fontSize: '18px' }}>Ghi nhớ thông tin</Text>
                                    </div>


                                    <Text style={{ color: '#FFFFFF59', fontSize: '18px' }}>Quên mật khẩu ?</Text>
                                </div>

                                <Button style={{ width: '100%', height: 75, backgroundColor: '#2E2E2E78', borderColor: '#2E2E2E78', marginTop: '50px' }}>
                                    <div style={{ justifyContent: "center", alignItems: 'center', display: 'flex' }}>
                                        <FaFacebookF style={{fontSize: '30', color: '#FFF'}} />
                                        <Text style={{ color: '#FFFFFF59', fontSize: '18px' }}>Đăng nhập bằng FaceBook</Text>
                                    </div>
                                </Button>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        </div>
    )
}
