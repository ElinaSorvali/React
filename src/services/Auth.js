import axios from "axios";

const baseurl = "https://localhost:7024/api/Authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseurl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }