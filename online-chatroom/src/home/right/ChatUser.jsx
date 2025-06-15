import React, { useEffect } from 'react';
import useConversation from '../../stateManagement/useConversation';
import { useSocketContext } from '../../context/SocketContext';

function ChatUser() {
    const { selectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    const getOnlineUserStatus = (userId) => {
        return onlineUsers.includes(userId) ? "Online" : "Offline";
    }


    useEffect(() => {

    }, [selectedConversation]);

    if (!selectedConversation) return null; // Hide UI until selected

    return (
        <div className='flex space-x-3 px-4 py-3 pb-3 h-[14vh] bg-gray-600 hover:bg-gray-700 duration:300 cursor-pointer'>
            <div className="avatar avatar-online">
                <div className="w-14 rounded-full">
                    {/* <img src="https://avatars.githubusercontent.com/u/134628720?v=4" /> */}
                    <img
                        src={selectedConversation.image || `https://robohash.org/${selectedConversation._id}`} // fallback to generated
                        alt={selectedConversation.name}
                    />
                </div>
            </div>
            <div>
                <h1 className='text-xl font-bold '>{selectedConversation.name || 'User'}</h1>
                <span className='text-sm' >{getOnlineUserStatus(selectedConversation._id)}</span>
            </div>
        </div>
    );
}

export default ChatUser;


