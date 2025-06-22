import { RiSendPlane2Line } from "react-icons/ri";
import useSendMessages from "../../context/useSendMessages.js";
import { useState, useRef } from "react";
import { useSocketContext } from "../../context/SocketContext";

function Type() {
  const { loading, sendMessages } = useSendMessages();
  const [message, setMessage] = useState("");
  const { socket } = useSocketContext();
  const typingTimeout = useRef(null);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      await sendMessages(message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };




  const handleInput = (e) => {
  const value = e.target.value;
  setMessage(value);

  if (socket) {
    if (value.trim() !== "") {
      socket.emit("typing", { username: "Virat" });

      // Clear previous timeout if still typing
      clearTimeout(typingTimeout.current);

      // Set stopTyping timeout
      typingTimeout.current = setTimeout(() => {
        socket.emit("stopTyping");
      }, 1000); // if idle for 1 second, assume stop typing
    } else {
      socket.emit("stopTyping"); // cleared input
    }
  }
};
  return (
    <form onSubmit={handelSubmit}>
      <div className="flex items-center h-[11vh] space-x-2 text-center bg-gray-600">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            value={message}
            // onChange={(e) => setMessage(e.target.value)}
            onChange={handleInput}
            placeholder="Type here"
            className="border-[1px] rounded-xl border-gray-700 px-3 py-3
              flex item-center gap-2 w-full grow outline-none bg-slate-900 mt-1"
          />
        </div>
        <button type="submit" disabled={loading}>
          <RiSendPlane2Line className="text-5xl p-2 hover:bg-gray-700 rounded-full duration-300" />
        </button>
      </div>
    </form>
  );
}

export default Type;
