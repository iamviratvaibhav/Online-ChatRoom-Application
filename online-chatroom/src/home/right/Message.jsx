function Messages({message}) {

    const authUser=JSON.parse(localStorage.getItem("messenger"));
    const itsme=message.senderId === authUser.user._id;
    const chatName=itsme? "chat-end" : "chat-start";
    const colorName=itsme? "chat-bubble-success" : "chat-bubble-info";
    const rawTime = message.createdAt || message.timestamp || Date.now();
    const time = new Date(rawTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <div className='p-2'>
            <div className={`chat ${chatName}`}>
                <div className={`chat-bubble ${colorName}`}>{message.message}</div>
                <div>{time}</div>
            </div>
            
        </div>
    )
}



export default Messages



//----------------------------msg bugs------------------------ 
// function Message({ message }) {
//   const authUser = JSON.parse(localStorage.getItem("messenger"));
//   const itsme = message.senderId === authUser.user._id;
//   const chatName = itsme ? "chat-end" : "chat-start";
//   const colorName = itsme ? "chat-bubble-success" : "chat-bubble-info";
//   const rawTime = message.createdAt || message.timestamp || Date.now();
//   const time = new Date(rawTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   return (
//     <div className='p-2'>
//       <div className={`chat ${chatName}`}>
//         <div className={`chat-bubble ${colorName}`}>{message.message}</div>
//         <div>{time}</div>
//       </div>
//     </div>
//   );
// }

// export default Message;