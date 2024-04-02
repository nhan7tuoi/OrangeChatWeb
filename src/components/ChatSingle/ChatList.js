import React from 'react'
import { Button, Typography } from 'antd'

const { Text } = Typography;

const data = [{
  id: 0,
  avt: './images/avt.jpg',
  name: 'Phạm Đức Nhân',
  time: '1 phút'
}, {
  id: 1,
  avt: './images/avt.jpg',
  name: 'Nguyễn Nhật Sang',
  time: '15 phút'
}, {
  id: 2,
  avt: './images/avt.jpg',
  name: 'Võ Trọng Tài',
  time: '1 giờ'
}, {
  id: 3,
  avt: './images/avt.jpg',
  name: 'Bùi Nhựt Duy',
  time: '2 ngày'
}];


export default function ChatList() {

  return (
<<<<<<< HEAD:src/components/ChatSingle/ChatList.js
    <div style={{ height: '100%' }}>
=======
    <div style={{ marginTop:'20px', marginLeft: '10px', height:'79.5vh' }}>
>>>>>>> d2c13c61cb976d02e52bd73382c548ffc9e45601:src/components/ChatRoom/ChatList.js
      {data.map(item => (
        <Button key={item.id} style={{ display: 'flex', width: '100%', height: '10%', background: '#242424', border: 'hidden' }}>
          <img src={item.avt} style={{ width: '60px', height: '60px', borderRadius: '100%' }} ></img>

          <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginLeft: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: '20px', fontWeight: '700px', color: '#FFF' }}>{item.name}</Text>
              <Text style={{fontSize: '14px', fontWeight: '400px', color: '#666'}}>{item.time}</Text>
            </div>
            <Text style={{fontSize: '14px', fontWeight: '400px', color: '#666', textAlign: 'left'}}>Hello</Text>
          </div>
        </Button>))}
    </div>
  )
}
