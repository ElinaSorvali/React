import axios from "axios";

// const baseUrl = "https://localhost:7024/api/Products"
const baseUrl = "https://northwindrestapi20240418084732.azurewebsites.net/api/Products"

//Axios-kirjastolla pitää olla oikeat nimet (delete, put jne) mutta metodin nimet voi itse valita
const getAll = () => {
    
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newProduct => {
    return axios.post(baseUrl, newProduct)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = object => {
    return axios.put(`${baseUrl}/${object.productId}`, object)
}

export default { getAll, create, remove, update }