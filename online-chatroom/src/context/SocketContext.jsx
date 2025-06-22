import { createContext, useEffect, useContext, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => useContext(socketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser] = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser && typeof authUser === 'object' && authUser.user && authUser.user._id) {
      // console.log("Connecting socket with user SocketContext ------:", authUser.user._id);
      const socketInstance = io("http://localhost:5002", {
        query: {
          userId: authUser.user?._id,
        },
      });

      setSocket(socketInstance);

      socketInstance.on("getonline", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.disconnect();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
