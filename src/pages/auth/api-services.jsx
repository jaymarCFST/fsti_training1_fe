import axios from "axios"

export const login = async (data) => {
    const auth = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/auth/login',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        data : data
    })

    console.log(auth);
    return auth.data;
}

export const getUsers = async () => {
    const auth = await axios({
        method: 'get',
        url: 'http://localhost:8080/api/users/all',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    console.log(auth);
    return auth.data;
}

export const logout = async () => {
    const auth = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/auth/logout',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    return auth.data;
}

export const register = async (data) => {
    const auth = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/auth/register',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        data : data
    })

    console.log(auth);
    return auth.data;
}

export const createUser = async (data) => {
    const auth = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/users/store',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data : data,
    })

    console.log(auth);
    return auth.data;
}

export const updateUser = async (data) => {
    const auth = await axios({
        method: 'put',
        url: 'http://localhost:8080/api/users/update',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data : data,
    })

    console.log(auth);
    return auth.data;
}

export const deleteUser = async (id) => {
    const auth = await axios({
        method: 'delete',
        url: `http://localhost:8080/api/users/${id}`,
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })

    console.log(auth);
    return auth.data;
}