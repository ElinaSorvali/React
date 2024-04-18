import axios from "axios";

// const baseUrl = "https://localhost:7024/api/Customers"
const baseUrl = "https://northwindrestapi20240418084732.azurewebsites.net/api/Customers"

//Axios-kirjastolla pitää olla oikeat nimet (delete, put jne) mutta metodin nimet voi itse valita

let token = null

//Tämä on metodi jota kutsutaan aina ennenkuin tehdään muu pyyntö serviceen
//Parametrina annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newCustomer => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newCustomer, config)
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
    return axios.put(`${baseUrl}/${object.customerId}`, object, config)
}

export default { getAll, create, remove, update, setToken }