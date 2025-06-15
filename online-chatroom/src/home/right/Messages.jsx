import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../context/useGetMessages.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { messages, loading } = useGetMessages();
  useGetSocketMessage();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="flex flex-col overflow-y-auto p-4" style={{ maxHeight: "calc(88vh - 8vh)" }}>
      {loading && <Loading />}

      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} />
          </div>
        ))
      ) : (
        !loading && (
          <div style={{ minHeight: "calc(75vh - 2vh)" }}>
            <p className="text-center font-bold mt-[20%] font-sans">Say Hi to start the conversation</p>
          </div>
        )
      )}
    </div>
  );
}

export default Messages;
