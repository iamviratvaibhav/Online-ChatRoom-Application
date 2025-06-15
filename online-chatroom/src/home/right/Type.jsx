import { RiSendPlane2Line } from "react-icons/ri";
import useSendMessages from "../../context/useSendMessages.js";
import { useState } from "react";

function Type() {
  const { loading, sendMessages } = useSendMessages();
  const [message, setMessage] = useState("");

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

  return (
    <form onSubmit={handelSubmit}>
      <div className="flex items-center h-[11vh] space-x-2 text-center bg-gray-600">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
