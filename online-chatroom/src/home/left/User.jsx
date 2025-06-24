import React from 'react'
import useConversation from '../../stateManagement/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  if (!user) return null
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div className={`hover:bg-slate-600 duration-300 cursor-pointer, ${isSelected ? "bg-slate-700" : ""

      }`} onClick={() => setSelectedConversation(user)}
    >
      <div className='flex space-x-3 px-4 py-3 hover:bg-slate-600 duration:300 cursor-pointer'>

        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-14 rounded-full">
            <img
              src={user.image || `https://robohash.org/${user._id}`} 
              alt={user.name}
            />
          </div>
        </div>

        <div>
          <h1 className='font-bold'>{user.name} </h1>
          <span>{user.email}  </span>
        </div>
      </div>
    </div>
  )
}

export default User
