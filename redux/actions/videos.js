import axios from 'axios';

import { SET_VIDEOS, CLEAR_VIDEOS } from '../types/videos';

export const fetchVideos = (channelName, after, before) => async (dispatch) => {
    try {
        const channelNameQuery = channelName ? `channelName=${channelName}` : '';
        const afterQuery = after ? `after=${after}` : '';
        const beforeQuery = before ? `before=${before}` : '';
        const res = await axios.get(
            'http://localhost:3000/api/videos?' +
                `&${channelNameQuery}` +
                `&${afterQuery}` +
                `&${beforeQuery}`,
        );
        dispatch(setVideos(res.data));
    } catch (e) {
        console.log(e.message);
    }
};

export const setVideos = (videosData) => ({
    type: SET_VIDEOS,
    payload: {
        items: videosData.data,
        pagination: videosData.pagination,
    },
});

export const clearVideos = () => ({
    type: CLEAR_VIDEOS,
});
