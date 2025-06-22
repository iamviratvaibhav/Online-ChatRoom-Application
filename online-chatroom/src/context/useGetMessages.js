import { useState, useEffect } from 'react';
import useConversation from '../stateManagement/useConversation.js';
import axios from 'axios';

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessage } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return;

      setLoading(true);
      try {
        const res = await axios.get(`/api/user/getmessage/${selectedConversation._id}`);
        const msgArray = res.data?.messages;

        if (Array.isArray(msgArray)) {
          setMessage(msgArray); // ✅ sets only the array
        } else {
          console.error("Expected 'messages' array, got:", res.data);
          setMessage([]); // fallback
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setMessage([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id]);

  return { loading, messages };
}

export default useGetMessages;

// 1. It get the msg from selected conversation by API 
// 2. getmsg fn make a get req to the api endpoints, sets loading true and updated
//    the msgt state with the receiver data/
// 3. If the data isnot an array,  it logs an error and sets msg state to an empty array
// 4.  it returns an object

