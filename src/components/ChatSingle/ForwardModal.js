import React from 'react';

const ForwardModal = ({ onClose, onForward, userId }) => {
    // Danh sách bạn bè (một ví dụ)
    const friends = [
        { id: 1, name: "Friend 1" },
        { id: 2, name: "Friend 2" },
        { id: 3, name: "Friend 3" }
    ];

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Chọn bạn bè để chuyển tiếp tin nhắn</h2>
                    <button onClick={onClose}>Đóng</button>
                </div>
                <div className="modal-body">
                    <ul>
                        {friends.map(friend => (
                            <li key={friend.id} onClick={() => onForward(friend.id)}>
                                {friend.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ForwardModal;
