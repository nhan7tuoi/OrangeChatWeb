import React, { useEffect, useId, useRef } from 'react'
import { Button, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import connectSocket from '../../server/ConnectSocket';
import { setConversations } from '../../redux/conversationSlice';
import conversationApi from '../../apis/conversationApi';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage, setUserId } from '../../redux/currentSlice';

const { Text } = Typography;

export default function ChatList() {
  let navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversation.conversations);
  const scrollRef = useRef(null);
  

  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    connectSocket.on('conversation updated', () => {
      getConversation();
    })
  })

  const getConversation = async () => {
    try {
      const response = await conversationApi.getConversation({ userId: user._id });

      if (response) {
        dispatch(setConversations(response.data));
        // console.log("response", response.data);
      }

    } catch (error) {
      console.log('error getConversation', error);
    }
  };

  const handleButtonClick = () => {
    dispatch(setCurrentPage('ChatWindow'));
  };

  const handleUserId = (userId) => {
    dispatch(setUserId(userId));
    console.log("UserID", userId);
  };

  const currentPage = useSelector(state => state.current.currentPage);
  // console.log("CurrentChat", currentPage);

  return (
    conversations.map((item, index) => {
        // console.log("item:", item);
        const otherMember = item?.conversation?.members.find(member => member._id !== user._id);
        // console.log("member",otherMember._id);
        if (otherMember) {
          return (
            <div key={index} ref={scrollRef} style={{ overflowY: 'auto' }}>
              <Button style={{ display: 'flex', width: '100%', height: '10%', background: '#242424', border: 'hidden' }}
                onClick={() => (handleButtonClick(), handleUserId(
                  {
                      receiverId: otherMember._id,
                      conversationId: item.conversation._id,
                      receiverImage: otherMember.image,
                      receiverName: otherMember.name
                  } 
                  
                ))}>
                <img src={otherMember.image} style={{ width: '60px', height: '60px', borderRadius: '100%' }} ></img>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginLeft: '5px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: '20px', fontWeight: '700px', color: '#FFF' }}>{
                      otherMember.name
                    }</Text>
                    {/* <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#666' }}>{item.time}</Text> */}
                  </div>
                  {
                    item?.lastMessage?.senderId === user._id
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
