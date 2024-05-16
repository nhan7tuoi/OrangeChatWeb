import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from 'antd'
import { useDispatch } from 'react-redux';
import connectSocket from '../../server/ConnectSocket';
import conversationApi from '../../apis/conversationApi';
import { setConversationReload, setCurrentPage } from '../../redux/currentSlice';
import { formatConversation } from '../../utils/formatConverstation';

const { Text } = Typography;

export default function ChatList() {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  // const listConversations = JSON.parse(localStorage.getItem('conversations'));
  const conversation = JSON.parse(localStorage.getItem('conversation'));
  const [conversations, setConversations] = useState([]);
  const scrollRef = useRef(null);


  useEffect(() => {

    if (conversation !== null) {
      handleButtonClick();
    }

    getConversation();
    connectSocket.initSocket(user._id);
  }, []);

  useEffect(() => {
    connectSocket.on('conversation updated', () => {
      getConversation();
    })
  })

  const getConversation = async () => {
    try {
      const response = await conversationApi.getConversation({
        userId: user._id,
      });

      if (response) {
        const fmConversations = formatConversation({
          data: response.data,
          userId: user._id,
        });
        localStorage.setItem('conversations', JSON.stringify(fmConversations));
        setConversations(fmConversations);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleButtonClick = () => {
    dispatch(setCurrentPage('ChatWindow'));
  };

  return (
    conversations.map((item, index) => {
      const otherMember = item?.members.find(member => member._id !== user._id);
      if (otherMember) {
        return (
          <div key={index} ref={scrollRef} style={{ overflowY: 'auto' }}>
            <Button style={{ display: 'flex', width: '100%', height: '10%', background: '#242424', border: 'hidden' }}
              onClick={() => {
                localStorage.setItem('conversation', JSON.stringify(item));
                handleButtonClick()
                dispatch(setConversationReload(item._id))
              }
              }>
              <img src={otherMember.image} style={{ width: '60px', height: '60px', borderRadius: '100%' }} ></img>

              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginLeft: '5px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: '20px', fontWeight: '700px', color: '#FFF' }}>{
                    otherMember.name
                  }</Text>
                  {/* <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#666' }}>{item.time}</Text> */}
                </div>
                {
                  item?.lastMessage?.senderId_id === user._id
                    ? (
                      <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#666', textAlign: 'left' }}>
                        Bạn: {
                          item?.lastMessage?.contentMessage
                        }</Text>
                    )
                    : (
                      <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#666', textAlign: 'left' }}>
                        {
                          item?.lastMessage?.contentMessage
                        }
                      </Text>
                    )
                }
              </div>
            </Button>
          </div>)
      }
    }
    )
  )
}
