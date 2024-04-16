import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import connectSocket from '../../server/ConnectSocket';
import { setConversationGroups, setConversations } from '../../redux/conversationSlice';
import conversationApi from '../../apis/conversationApi';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage, setUserId } from '../../redux/currentSlice';
import { formatConversation } from './../../utils/formatConverstation';

const { Text } = Typography;

export default function ChatList() {

  let navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversation.conversationGroups);

  console.log("Group: ", conversations);
  const scrollRef = useRef(null);

  useEffect(() => {
    connectSocket.on('newGroupName', data => {
      fetchData();
    });
  }, []);
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    try {
      const res = await conversationApi.getConversationGroups({
        userId: user._id,
      });
      if (res) {
        const fConversation = formatConversation({
          data: res.data,
          userId: user._id,
        });
        dispatch(setConversationGroups(fConversation));
        console.log(fConversation);
      }
    } catch (error) {
      console.error('Error fetching data a:', error);
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

    <div style={{ height: '620px', width: '100%' }}>

      <div ref={scrollRef} style={{ overflowY: 'auto', height: '100%', width: '100%' }}>
        {conversations.map((item, index) => {
          // console.log("Item: ", item);

          return (
            <div key={index}>
              {/* Giao diện chat */}
              <Button
                style={{ display: 'flex', width: '100%', height: '10%', background: '#242424', border: 'hidden' }}
                onClick={() => {
                  handleButtonClick();
                  handleUserId({
                    // receiverId: item._id,
                    // conversationId: item.conversations,
                    // receiverImage: item.image,
                    // receiverName: item.nameGroup
                    groupChat : item
                  });
                }}
              >
                <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '100%' }} alt="Avatar" />
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginLeft: '5px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: '20px', fontWeight: '700px', color: '#FFF' }}>{item.nameGroup}</Text>
                  </div>
                  {item?.lastMessage?.senderId === user._id ? (
                    <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#666', textAlign: 'left' }}>
                      Bạn: {item?.lastMessage?.contentMessage}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: '14px', fontWeight: '400px', color: '#666', textAlign: 'left' }}>
                      {item?.lastMessage?.contentMessage}
                    </Text>
                  )}
                </div>
              </Button>
            </div>
          );
          // }
        })}
      </div>
    </div>
  )


}
