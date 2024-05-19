import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import connectSocket from '../../server/ConnectSocket';
import { setConversationGroups, setConversations, setCoversation } from '../../redux/conversationSlice';
import conversationApi from '../../apis/conversationApi';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage2, setConversationReload } from '../../redux/currentSlice';
import { formatConversation } from './../../utils/formatConverstation';

const { Text } = Typography;

export default function ChatList() {

  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  // const listConversations = JSON.parse(localStorage.getItem('conversations'));
  const conversation1 = JSON.parse(localStorage.getItem('conversation1'));
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [conversations,setConversations] = useState([]);

  
  const scrollRef = useRef(null);
  
  useEffect(() => {
    fetchData();
    connectSocket.initSocket(user._id);

    connectSocket.on('newConversationGroup', data => {
      fetchData();
    });
    connectSocket.on('addToGroup', data => {
      fetchData();
    });
    connectSocket.on('updateConversation', data => {
      fetchData();
    });
    connectSocket.on('chat message', () => {
      fetchData();
    });
    connectSocket.on('disbandGroup', () => {
      fetchData();
    });
    connectSocket.on('removeMember', data => {
      if (!conversation1._id || conversation1._id === data.conversation._id)
        fetchData();
    });
    connectSocket.on('deletedMember', data => {
      fetchData();
    });
  }, []);

  

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
        localStorage.setItem('conversations', JSON.stringify(fConversation));
        setConversations(fConversation);
      }
    } catch (error) {
      console.error('Error fetching data a:', error);
    }
  };



  const handleButtonClick = () => {
    dispatch(setCurrentPage2('ChatWindow'));
      console.log('cc',conversation1);
  };
  return (

    // <div style={{ height: '620px', width: '100%' }}>

      <div ref={scrollRef} style={{ overflowY: 'auto', height: '100%', width: '100%' }}>
        {conversations.map((item, index) => {
          // console.log("Item: ", item);

          return (
            <div key={index}>
              {/* Giao diện chat */}
              <Button
                style={{ display: 'flex', width: '100%', height: '10%', background: '#242424', border: 'hidden' }}
                onClick={() => {
                  localStorage.setItem('conversation1', JSON.stringify(item));
                  handleButtonClick();
                  dispatch(setConversationReload(item._id))
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
    // </div>
  )


}
