import axios from "axios";

const baseUrl = "https://localhost:7024/api/Customers"
//Axios-kirjastolla pitää olla oikeat nimet (delete, put jne) mutta metodin nimet voi itse valita
const getAll = () => {
    
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = object => {
    return axios.put(`${baseUrl}/${object.customerId}`, object)
}

export default { getAll, create, remove, update }