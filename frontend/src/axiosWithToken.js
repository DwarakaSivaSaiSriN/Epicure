import axios from 'axios'

function getAxiosWithToken() {

    const token = sessionStorage.getItem('token')
    const axiosWithToken = axios.create({
        headers : {Authorization: `Bearer ${token}`}
    });

    return axiosWithToken;
}

export default getAxiosWithToken