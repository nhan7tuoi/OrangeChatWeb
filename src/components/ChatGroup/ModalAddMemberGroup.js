import React, { useEffect, useRef, useState } from 'react';
import '../../css/Modal.css'; // File CSS cho modal
import { IoIosSearch } from "react-icons/io";
import { Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchFriends } from '../../redux/friendSilce';
import connectSocket from '../../server/ConnectSocket';
import { IoMdAdd } from "react-icons/io";
import i18next from '../../i18n/i18n';
import { setCoversation } from '../../redux/conversationSlice';
import { formatOneConversation } from '../../utils/formatOneConverstation';

const { Text } = Typography;


function ModalAddMemberGroup({ isOpen, toggleModal }) {


    // const conversation = useSelector(state => state.conversation.conversation)
    const conversation1 = JSON.parse(localStorage.getItem("conversation1"));
    const scrollRef = useRef(null);
    const [keyword, setKeyword] = useState("");
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const listFriends = useSelector(state => state.friend.listFriends);

    const [newList, setNewList] = useState([]);

    useEffect(() => {
        fetchData();
        setNewList(listFriends?.filter(
            f => !conversation1?.members?.some(m => m._id === f._id),
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
            conversation: conversation1,
            member: member,

        });
        // console.log(member);
    };

    useEffect(() => {
        connectSocket.on('respondAdd', data => {
            const fConversation = formatOneConversation({
                conversation: data,
                userId: user._id,
            });
            dispatch(setCoversation(fConversation));
            console.log("add", fConversation);

        });
    }, []);
    // console.log("newList", newList);
    


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
                                    {Array.isArray(newList) && newList.map((user, index) => (
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
