import { createSelector } from 'reselect';

export const selectFavoriteItems = (state) => state.favorites.items;

export const selectFavoriteItemsIds = createSelector(selectFavoriteItems, (items) =>
    items.map((item) => item.id),
);
