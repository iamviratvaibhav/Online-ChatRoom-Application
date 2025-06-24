import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../context/useGetMessages.js";
import Loading from "../../Components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function getFormattedDateLabel(date) {
  const msgDate = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(msgDate, today)) return "Today";
  if (isSameDay(msgDate, yesterday)) return "Yesterday";

  return msgDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Messages() {
  const { messages, loading } = useGetMessages();
  useGetSocketMessage();
  const { socket } = useSocketContext();

  const lastMessageRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    if (!socket) return;

    const handleTyping = ({ username }) => {
      setTypingUser(username || "Someone");
      setIsTyping(true);
    };

    const handleStopTyping = () => {
      setTypingUser("");
      setIsTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [socket]);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages, isTyping]);

  let previousDate = null;

  return (
    <div className="flex flex-col overflow-y-auto p-4" style={{ minHeight: "calc(88vh - 8vh)" }}>
      {loading && <Loading />}

      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message, index) => {
          const currentDate = new Date(message.createdAt);
          const showDateLabel =
            !previousDate || currentDate.toDateString() !== previousDate.toDateString();
          previousDate = currentDate;

          const isLast = index === messages.length - 1;

          return (
            <div key={message._id} ref={isLast ? lastMessageRef : null}>
              {showDateLabel && (
                <div className="text-center text-xs text-gray-400 my-2">
                  {getFormattedDateLabel(currentDate)}
                </div>
              )}
              <Message message={message} />
            </div>
          );
        })
      ) : (
        !loading && (
          <div style={{ minHeight: "calc(75vh - 2vh)" }}>
            <p className="text-center font-bold mt-[20%] font-sans">
              Say Hi to start the conversation
            </p>
          </div>
        )
      )}
      {isTyping && (
        <div className="text-sm italic text-gray-400 mt-2 ml-2">
          {typingUser} is typing...
        </div>
      )}
    </div>
  );
}

export default Messages;
