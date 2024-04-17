import axios from "axios";

const baseUrl = "https://localhost:7024/api/Users"

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

//Axios-kirjastolla pitää olla oikeat nimet (delete, put jne) mutta metodin nimet voi itse valita
const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }    
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newUser => {
    const config = {
        headers: { Authorization: token },
    }  
    return axios.post(baseUrl, newUser, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }  
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = object => {
    const config = {
        headers: { Authorization: token },
    }  
    return axios.put(`${baseUrl}/${object.userId}`, object, config)
}

export default { getAll, create, remove, update, setToken }