import React from 'react'
import { Typography } from 'antd'

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
    <div style={{ marginTop: '20px', marginLeft: '10px' }}>
      {data.map(item => (
        <div key={item.id} style={{ marginBottom: '10px', display: 'flex' }}>
          <img src={item.avt} style={{ width: '60px', height: '60px', borderRadius: '100%' }}></img>

          <div style={{display: 'flex', flexDirection: 'column', width: '100%', paddingRight: '5px', margin: '10px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: '20px', fontWeight: '700px', color: '#FFF' }}>{item.name}</Text>
              <Text style={{fontSize: '14px', fontWeight: '400px', color: '#666'}}>{item.time}</Text>
            </div>
            <Text style={{fontSize: '14px', fontWeight: '400px', color: '#666'}}>Hello</Text>
          </div>
        </div>))}
    </div>
  )
}
