import { useEffect, useState } from 'react';
import useFetch from './useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import privatePages from '../constants/privatePages';

export default function useAuth() {
    const [user, setUser] = useState(null);
    const userFetch = useFetch('/api/users/self');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        userFetch.fetchData();
    }, []);

    useEffect(() => {
        if (userFetch.error) {
            setUser(null);
        } else {
            setUser(userFetch.data);
        }
    }, [userFetch.error, userFetch.data]);

    useEffect(() => {
        if (!userFetch.error && !userFetch.data) {
            return
        }
        const isPrivatePage = privatePages.find((page) => page.path === location.pathname);
        if (!isPrivatePage) return;
        if (!user) {
            return navigate('/login');
        }
        if (user?.role === 'ADMIN') return;
        if (user?.role !== isPrivatePage.role) {
            return navigate('/forbidden');
        }
    }, [location, user]);


    const login = async (email, password) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        };
        const res = await fetch('/api/auth/login', options)
        const data = await res.json()
        if (!res.ok) {
            return {
                ok: false,
                data
            }
        }
        const userFetched = await userFetch.fetchData()
        if (!userFetched) {
            return {
                ok: false,
                data: {
                    message_code_string: 'cant_fetch_user'
                }
            }
        }
        return {
            ok: true,
            data
        }
    }

    const register = async ({ email, password, first_name, last_name }) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                first_name,
                last_name,
            }),
        };
        const res = await fetch('/api/auth/register', options)
        const data = await res.json()
        if (!res.ok) {
            return {
                ok: false,
                data
            }
        }
        const userFetched = await userFetch.fetchData()
        if (!userFetched) {
            return {
                ok: false,
                data: {
                    message_code_string: 'cant_fetch_user'
                }
            }
        }
        return {
            ok: true,
            data
        }
    }

    const logout = async () => {
        const options = {
            method: 'POST',
        }
        const res = await fetch('/api/auth/logout', options)
        const data = await res.json()
        if (!res.ok) {
            return {
                ok: false,
                data
            }
        }
        const userFetched = await userFetch.fetchData()
        if (!userFetched) {
            return {
                ok: true,
                data: {
                    message_code_string: 'user_logged_out'
                }
            }
        }
        return {
            ok: false,
            data: {
                message_code_string: 'cant_logout'
            }
        }
    }

    return {
        user,
        error: userFetch.error,
        login,
        register,
        logout,
        updateUser: userFetch.fetchData,
    };
}