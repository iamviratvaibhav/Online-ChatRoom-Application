import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function UserGetAllUser() {
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const token = Cookies.get("jwt");
                const response = await axios.get("/api/user/getUserPro", {
                    withCredentials: true, 
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllUser(response.data.filterUser); 
            } catch (error) {
                console.log("Error in getAllUser:", error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    return [allUser, loading];
}

export default UserGetAllUser;
