import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {
        'Client-ID': 'w506rlbqf7md9hjwqqy2khftr4x73f',
        Authorization: 'Bearer 02chzkpiyxu9g2jp8d3ibgt18ahkvx',
    },
});

export default axiosInstance;
