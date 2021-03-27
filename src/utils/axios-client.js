import axios from 'axios';
import queryString from 'query-string';
import { getFirebase } from 'react-redux-firebase'
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    const firebase = getFirebase();
    const currentUser = firebase.auth().currentUser;
    let idTokenResult = await currentUser.getIdTokenResult();
    config.headers['Authorization'] = 'Bearer ' + idTokenResult.token;
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;