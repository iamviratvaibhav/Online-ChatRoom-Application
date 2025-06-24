import React, { useEffect } from 'react';
import useConversation from '../../stateManagement/useConversation';
import { useSocketContext } from '../../context/SocketContext';

function ChatUser() {
    const { selectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    useEffect(() => {
    }, [selectedConversation]);

    if (!selectedConversation) return null;

    const UserAvatar = ({ isOnline }) => (
        <div
            className={`avatar ${isOnline ? "avatar-online" : " avatar-offline"}`}>
            <div className='w-14 rounded-full'>
                <img src={selectedConversation.image || `https://robohash.org/${selectedConversation._id}`}
                    alt={selectedConversation.name} />
            </div>
        </div>
    )

    return (

        <div className='flex space-x-3 px-4 py-3 pb-3 h-[14vh] bg-gray-600 hover:bg-gray-700 duration:300 cursor-pointer'>
            <UserAvatar isOnline={onlineUsers.includes(selectedConversation._id)} />
            <div>
                <h1 className='text-xl font-bold'>{selectedConversation.name || 'User'}</h1>
                <span className='text-sm'>
                    {onlineUsers.includes(selectedConversation._id) ? 'Online' : 'Offline'}
                </span>
            </div>
        </div>

    );
}

export default ChatUser;



