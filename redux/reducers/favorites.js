import {
    ACCEPT_ADD_TO_FAVORITES,
    ACCEPT_REMOVE_FROM_FAVORITES,
    SET_FAVORITES,
    ACCEPT_CLEAR_FAVORITES,
} from '../types/favorites';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    items: [],
};

const favorites = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case HYDRATE:
            return state;
        case ACCEPT_ADD_TO_FAVORITES:
            return { items: [...state.items, payload] };
        case SET_FAVORITES:
            return { items: payload };
        case ACCEPT_REMOVE_FROM_FAVORITES:
            return {
                items: state.items.filter((item) => item.id !== payload),
            };
        case ACCEPT_CLEAR_FAVORITES:
            return {
                items: [],
            };
        default:
            return state;
    }
};

export default favorites;
