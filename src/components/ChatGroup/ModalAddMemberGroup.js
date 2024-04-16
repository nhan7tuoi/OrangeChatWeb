import React, { useEffect, useRef, useState } from 'react';
import './Modal.css'; // File CSS cho modal
// import { Button } from 'antd';
import { IoIosSearch } from "react-icons/io";
import { Button, Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, deleteFriend, fetchFriends, searchUsers, setFriends } from '../../redux/friendSilce';
import FriendApi from '../../apis/FriendApi';
import connectSocket from '../../server/ConnectSocket';
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import i18next from '../../i18n/i18n';
import { addMember, removeMember, setCoversation, setMembers } from '../../redux/conversationSlice';
import messageApi from '../../apis/messageApi';
import { formatOneConversation } from '../../utils/formatOneConverstation';
// import {launchImageLibrary} from 'react-native-image-picker';
// import {setCoversation, setNameGroup} from '../redux/conversationSlice';
// import {formatConversation} from '../utils/formatConversation';
// import {formatOneConversation} from '../utils/formatOneConversation';

const { Text, Title } = Typography;


function ModalAddMemberGroup({ isOpen, toggleModal }) {


    const members = useSelector(state => state.conversation.members);
    const conversation = useSelector(state => state.conversation.conversation)
    const [groupName, setGroupName] = useState('');

    const [temp, setTemp] = useState([]);
    const scrollRef = useRef(null);
    const [keyword, setKeyword] = useState("");
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const resultSearch = useSelector(state => state.friend.resultSearch);

    const listFriends = useSelector(state => state.friend.listFriends);

    const [newList, setNewList] = useState([]);

    useEffect(() => {
        fetchData();

        setNewList(listFriends.filter(
            f => !conversation.members.some(m => m._id === f._id),
        ));
    }, []);

    const fetchData = async () => {
        try {
            dispatch(fetchFriends(user._id));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleAddMember = member => {
        connectSocket.emit('add member to group', {
            conversation: conversation,
            member: member,

        });
        console.log(member);
    };

    useEffect(() => {
        connectSocket.on('respondAdd', data => {
          // let temp = [];
          // temp.push(data);
          // temp = formatConversation({
          //   data: temp,
          //   userId: user._id,
          // });
    
          const fConversation = formatOneConversation({
            conversation: data,
            userId: user._id,
          });
    
          dispatch(setCoversation(fConversation));
        //   navigation.navigate('ChatScreen');
          // dispatch(setNameGroup(temp[0].nameGroup));
    
          // navigation.navigate('ChatScreen', {
          //   receiverId: data?.members.filter(member => member._id !== user._id),
          //   conversationId: data?._id,
          //   receiverImage: data?.image,
          //   conversation: data,
          // });
        });
      }, []);
    return (
        <>
            {isOpen && (
                <div className="modal-overlay" style={{}}>
                    <div className="modal" style={{ backgroundColor: '#242424' }}>
                        <div className="modal-content" style={{ width: '500px', height: '600px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontSize: '24px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>Thêm thành viên</Text>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#36373A', paddingLeft: '10px', width: '450px', borderRadius: '8px', marginTop: '10px' }}>
                                <IoIosSearch style={{ fontSize: '18', color: '#FFF' }} />
                                <input type='text' placeholder={i18next.t('nhapSoDienThoaiHoacTen')} onChange={(evt) => setKeyword(evt.target.value)} style={{ width: '100%', height: '40px', background: '#36373A', marginLeft: '5px', border: 'hidden', outline: 'none', color: '#FFF', borderRadius: '10px' }}></input>
                            </div>
                            <div style={{ width: '100%', height: '380px' }}>
                                <div ref={scrollRef} style={{ overflowY: 'auto', background: '#242424', width: '100%', height: '100%' }}>
                                    {Array.isArray(listFriends) && listFriends.map((user, index) => (
                                        <div key={index} style={{ display: 'flex', width: '90%', background: '#242424', padding: '5px', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', marginLeft: '25px', border: '2px solid #2E2E2E', borderRadius: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={user.image} style={{ height: '30px', width: '30px', borderRadius: '50%', marginLeft: '5px' }} alt='image'></img>
                                                <Text style={{ marginLeft: '20px', color: 'white', fontSize: '16px' }}>{user.name}</Text>
                                            </div>

                                            <Button style={{ display: 'flex', width: '40px', height: '40px', background: '#36373A', borderRadius: '100%', justifyContent: 'center', alignItems: 'center', border: 'hidden' }}
                                                onClick={() => { handleAddMember(user) }}

                                            >

                                                <IoMdAdd style={{ fontSize: '30', color: '#FFF' }} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>


                                <div style={{ width: '470px', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                    <Button style={{ width: '100px', height: '40px' }}
                                        onClick={toggleModal}
                                    >
                                        <Text>Xong</Text>
                                    </Button>


                                    {/* <Button style={{ width: '100px', height: '40px', marginLeft: '10px', backgroundColor: '#36373A' }}
                                        onClick={() => { }}
                                    >
                                        <Text style={{ color: 'white' }}>Thêm</Text>
                                    </Button> */}


                                </div>

                                {/* <Button className="close" onClick={toggleModal}>&times;</Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalAddMemberGroup;
