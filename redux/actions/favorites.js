import axios from 'axios';

import {
    ACCEPT_ADD_TO_FAVORITES,
    ACCEPT_REMOVE_FROM_FAVORITES,
    SET_FAVORITES,
    ACCEPT_CLEAR_FAVORITES,
} from '../types/favorites';

export const fetchFavorites = () => async (dispatch) => {
    try {
        const favoriteVideosIds = localStorage.getItem('favoriteVideosIds');
        if (!favoriteVideosIds) {
            return;
        }

        const parsedFavoriteVideosIds = JSON.parse(favoriteVideosIds);
        const videosIdsString = parsedFavoriteVideosIds.join();
        const response = await axios.get(`http://localhost:3000/api/videos?ids=${videosIdsString}`);

        dispatch(setFavorites(response.data.data));
    } catch (e) {
        console.log(e);
    }
};

const setFavorites = (items) => ({
    type: SET_FAVORITES,
    payload: items,
});

export const addToFavorites = (id) => async (dispatch) => {
    try {
        console.log(localStorage.getItem('favoriteVideosIds'));
        const response = await axios.get(`http://localhost:3000/api/video/${id}`);
        const favoriteVideosIds = localStorage.getItem('favoriteVideosIds');
        if (favoriteVideosIds) {
            const parsedFavoriteVideosIds = JSON.parse(favoriteVideosIds);
            if (parsedFavoriteVideosIds.length >= 100) {
                return window.alert('Вы не можете добавить больше 10 видео в избранное');
            }
            localStorage.setItem(
                'favoriteVideosIds',
                JSON.stringify([...parsedFavoriteVideosIds, id]),
            );
        }
        if (!favoriteVideosIds) {
            localStorage.setItem('favoriteVideosIds', JSON.stringify([id]));
        }
        dispatch(acceptAddToFavorites(response.data.data));
    } catch (e) {
        console.log(e);
    }
};

const acceptAddToFavorites = (item) => ({
    type: ACCEPT_ADD_TO_FAVORITES,
    payload: item,
});

export const removeFromFavorites = (id) => async (dispatch) => {
    const favoriteVideosIds = localStorage.getItem('favoriteVideosIds');
    if (!favoriteVideosIds) {
        return;
    }
    const parsedFavoriteVideosIds = JSON.parse(favoriteVideosIds);
    const newFavoriteVideosIds = parsedFavoriteVideosIds.filter((videoId) => videoId !== id);
    localStorage.setItem('favoriteVideosIds', JSON.stringify(newFavoriteVideosIds));

    dispatch(acceptRemoveFromFavorites(id));
};

const acceptRemoveFromFavorites = (id) => ({
    type: ACCEPT_REMOVE_FROM_FAVORITES,
    payload: id,
});

export const clearFavorites = () => (dispatch) => {
    localStorage.removeItem('favoriteVideosIds');
    dispatch(acceptClearFavorites());
};

const acceptClearFavorites = () => ({
    type: ACCEPT_CLEAR_FAVORITES,
});
