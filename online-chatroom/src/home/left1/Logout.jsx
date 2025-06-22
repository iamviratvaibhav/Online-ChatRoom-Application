// import React, { useState } from 'react'
// import { TbLogout2 } from "react-icons/tb";
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import toast from 'react-hot-toast';

// function Logout() {
//   const [load, setLoad] = useState(false);
//   const handleLogout = async () => {
//     setLoad(true);
//     try {
//       const res=await axios.post("/api/user/logout");
//       localStorage.removeItem("messenger");
//       Cookies.remove("jwt");
//       setLoad(false);
//       // alert("Logout Successfully");
//       toast.success("Logout Successfully");
//       window.location.reload();
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <div className="w-[5%] bg-black text-white flex flex-col justify-end items-center">

//       <div className='p-1 align bottom-0' onClick={handleLogout}>
//         <TbLogout2 className='text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300' />
//       </div>

//     </div>
//   )
// }

// export default Logout





import React, { useState } from 'react';
import { TbLogout2 } from "react-icons/tb";
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

function Logout() {
  const [load, setLoad] = useState(false);

  const handleLogout = async () => {
    setLoad(true);
    try {
      await axios.post("/api/user/logout");

      localStorage.removeItem("messenger");
      Cookies.remove("jwt");

      setLoad(false);
      toast.success("Logout Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000); 

    } catch (error) {
      setLoad(false);
      toast.error("Logout failed");
      console.log(error);
    }
  };

  return (
    <div className="w-[5%] bg-black text-white flex flex-col justify-end items-center">
      <div className='p-1 align bottom-0' onClick={handleLogout}>
        <TbLogout2 className='text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300' />
      </div>
    </div>
  );
}

export default Logout;
