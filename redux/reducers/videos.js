import { SET_VIDEOS, CLEAR_VIDEOS } from '../types/videos';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    items: [],
    pagination: {},
};

const videos = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case HYDRATE:
            return { ...state, ...payload.videos };
        case SET_VIDEOS:
            return {
                ...state,
                items: [...state.items, ...payload.items],
                pagination: payload.pagination,
            };
        case CLEAR_VIDEOS:
            return initialState;
        default:
            return state;
    }
};

export default videos;
