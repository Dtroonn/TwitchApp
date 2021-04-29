import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../redux/store';

import styles from '../styles/Favorites.module.scss';

import Title from '../components/Title';
import VideoCard from '../components/videoCard';

import { selectFavoriteItems } from '../selectors/favorites';

import { removeFromFavorites, clearFavorites } from '../redux/actions/favorites';

export default function favorites() {
    const dispatch = useDispatch();
    const items = useSelector(selectFavoriteItems);

    const onRemoveItemFromFavoritesClick = (id) => {
        return dispatch(removeFromFavorites(id));
    };

    const handleClearButtonClick = (e) => {
        const isConfirm = window.confirm('Вы действительно хотите удалить все товары?');
        if (isConfirm) {
            dispatch(clearFavorites());
        }
    };

    return (
        <div className="container">
            {items.length > 0 && (
                <div className={styles.header}>
                    <Title className={styles.title}>
                        Избранное <span>{items.length}</span>
                    </Title>
                    <div className={styles.clearButton} onClick={handleClearButtonClick}>
                        Очистить избранное
                    </div>
                </div>
            )}
            {!items.length && (
                <Title>
                    У вас пока нет избранных видео. Начните собирать свою коллекцию нажатием кнопки
                    в карточке.
                </Title>
            )}
            <div className={styles.row}>
                {items.length > 0 &&
                    items.map((item) => (
                        <div className={styles.column} key={item.id}>
                            <VideoCard
                                {...item}
                                isFavorite={true}
                                onFavoritesButtonClick={onRemoveItemFromFavoritesClick}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//     console.log(store.getState().favorites);
// });
