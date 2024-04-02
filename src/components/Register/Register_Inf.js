import React from 'react'
import { Button, Col, Flex, Row, Typography } from 'antd'
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

export default function Register() {
  return (
    <div style={{ background: '#1D1D1D', width: '100vw', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 17, fontWeight: 800, color: '#F24E1E', padding: 50 }}>OrangeC</Text>
        <Link to='/' style={{ fontSize: 17, fontWeight: 800, color: '#FFF', padding: 50 }}>Đăng nhập</Link>
      </div>
      
      <div>
        <div style={{ padding: 80 }}>
          <div name="form">
            <Row justify='center'>
            <Col span={14} style={{  alignItems: 'center'}}>
            <img src='./images/Hello.svg' style={{ height:'600px', width:'100%' }}></img>
              </Col>
          
              <Col span={8} style={{ alignItems: 'center' }}>
                <Title style={{ color: '#FFFFFF', textAlign: 'center', fontWeight:'800', fontSize:'24px'}}>Thông tin cá nhân</Title>
                <div style={{ display:'flex', alignItems:'center', flexDirection:'column'}}>
                  <input name='name' type='text' placeholder='Tên tài khoản' style={{ backgroundColor: '#2E2E2E', width: '100%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>

                  <input name='password' type='text' placeholder='Mật khẩu' style={{  backgroundColor: '#2E2E2E', width: '100%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>
                  
                
                </div>
                <div style={{ display: 'flex', marginTop: 30 , justifyContent:'center', width:'200px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', width: '200px', alignItems:'start'}}>
                    <div>
                      <input type='radio' name='gender'></input>
                      <Text style={{ color: '#FFFFFF59' }}>Nam</Text>
                    </div>

                    <div>
                      <input type='radio' name='gender'></input>
                      <Text style={{ color: '#FFFFFF59' }}>Nữ</Text>
                    </div>

                  </div>
                  
                  </div> 
                

                {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <input name='name' type='text' placeholder='Tên' style={{ backgroundColor: '#2E2E2E', width: '40%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>

                  <input name='password' type='password' placeholder='Mật khẩu' style={{ backgroundColor: '#2E2E2E', width: '40%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <input name='birthday' type='date' placeholder='Chọn ngày sinh' style={{ backgroundColor: '#2E2E2E', width: '40%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>

                  <input name='confirmPassword' type='password' placeholder='Nhập lại mật khẩu' style={{ backgroundColor: '#2E2E2E', width: '40%', height: '60px', borderRadius: '10px', marginTop: '30px', fontSize: '18px', padding: '15px', color: '#FFF' }}></input>
                </div>

                <div style={{ display: 'flex', marginTop: 30 }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', width: '200px'}}>
                    <div>
                      <input type='radio' name='gender'></input>
                      <Text style={{ color: '#FFFFFF59' }}>Nam</Text>
                    </div>

                    <div>
                      <input type='radio' name='gender'></input>
                      <Text style={{ color: '#FFFFFF59' }}>Nữ</Text>
                    </div>

                  </div>
                  
                </div> */}
                  
                <Row justify='center'  >
                  <Col span={12} style={{ display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                    <Link to='/registerinf'>
                      <Button style={{ width: '440px', height: '60px', fontSize: '24px', fontWeight: '800px', color: '#FFFFFF', backgroundColor: '#F24E1E', borderColor: '#F24E1E', marginTop: '150px' , fontWeight:'600'}}>
                        Xác nhận
                      </Button>
                    </Link>
                    <Link to='/registercontinute' style={{ fontSize: 17, color: '#FFF', marginTop:'30px' }}>Quay lại</Link>
                   
                  </Col>
                </Row>


              </Col>
              
            </Row>
          </div>

        </div>
      </div>
    </div>
  )
}

