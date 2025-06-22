import React, { useEffect } from "react";
import ChatUser from "./ChatUser.jsx";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../stateManagement/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";


function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <ChatUser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(83vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Type />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-semibold text-xl">
              {authUser.user.name}
            </span>
            <br />
            No chat selected, please start conversation by selecting anyone to
            your contacts
          </h1>
        </div>
      </div>
    </>
  );
};