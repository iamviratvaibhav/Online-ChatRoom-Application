import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import UserGetAllUser from '../../context/UserGetAllUser.jsx';
import useConversation from '../../stateManagement/useConversation.js';

function Search() {
    const [search, setSearch] = useState("");
    const [allUsers] = UserGetAllUser();
    const { setSelectedConversation } = useConversation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;

        const foundUser = allUsers.find((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );

        if (foundUser) {
            setSelectedConversation(foundUser); 
            setSearch(""); 
        }
    };

    return (
        <div className='h-[12vh]'>
            <div className='px-6 py-2'>
                <form onSubmit={handleSubmit}>
                    <div className='flex space-x-1'>
                        <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg 
                            flex items-center gap-2 w-full p-2">
                            <input
                                type="text"
                                className='grow outline-none bg-slate-900 text-white'
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>
                        <button type="submit">
                            <IoSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;
