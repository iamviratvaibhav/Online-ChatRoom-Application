import React, { useState } from 'react'
import UserGetAllUser from '../../context/UserGetAllUser.jsx';
import User from './User'
function Users() {

  const [allUser, loading] = UserGetAllUser();
  // console.log(allUser);
  return (
    <div style={{maxHeight:" calc(80vh - 1vh)"} } 
      className='overflow-y-auto'>
      <User></User>
     {allUser.map((user, index)=>{
      return <User key={index} user={user} />
     })}
    </div>
  )
}

export default Users
