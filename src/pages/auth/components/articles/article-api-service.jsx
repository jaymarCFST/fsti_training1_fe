import axios from "axios";

export const getArticles = async () => {
    const response = await axios({
        method: 'get',
        url: 'http://localhost:8080/api/articles/all',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })

    console.log(response);
    return response.data;
}

export const deleteArticle = async (id) => {
    const auth = await axios({
        method: 'delete',
        url: `http://localhost:8080/api/articles/${id}`,
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    console.log(auth);
    return auth.data;
}

export const createArticle = async (data) => {
    const article = await axios({
        method: "POST",
        url: `http://localhost:8080/api/articles/store`,
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: data
    })

    return article.data;
}

export const updateArticle = async (data) => {
    const article = await axios({
        method: "PUT",
        url: `http://localhost:8080/api/articles/update`,
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: data
    })

    return article.data;
}