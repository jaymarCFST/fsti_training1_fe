import axios from "axios";

export const createCategory = async (data) => {
    const auth = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/article-categories/store',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: data
    })

    console.log(auth);
    return auth.data;
}

export const updateCategory = async (data) => {
    const auth = await axios({
        method: 'put',
        url: 'http://localhost:8080/api/article-categories/update',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: data
    })

    console.log(auth);
    return auth.data;
}

export const deleteCategory = async (id) => {
    const auth = await axios({
        method: 'delete',
        url: `http://localhost:8080/api/article-categories/${id}`,
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    console.log(auth);
    return auth.data;
}

export const getCategories = async () => {
    const auth = await axios({
        method: 'get',
        url: 'http://localhost:8080/api/article-categories/all',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })

    console.log(auth);
    return auth.data;
}