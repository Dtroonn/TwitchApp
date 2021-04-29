import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { wrapper } from '../redux/store';

import styles from '../styles/Videos.module.scss';

import VideoCard from '../components/videoCard';

import { fetchVideos, clearVideos } from '../redux/actions/videos';
import { addToFavorites, removeFromFavorites } from '../redux/actions/favorites';

import Title from '../components/Title';

import { selectFavoriteItemsIds } from '../selectors/favorites';

export default function Home({ searchValue }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const paginationCursorRef = React.useRef(null);
    const isFirstTimeDidMountRef = React.useRef(false);

    const dispatch = useDispatch();
    const { items, paginationCursor, favoriteItemsIds } = useSelector(
        ({ videos, ...state }) => ({
            items: videos.items,
            paginationCursor: videos.pagination.cursor,
            favoriteItemsIds: selectFavoriteItemsIds(state),
        }),
        shallowEqual,
    );

    console.log(favoriteItemsIds);

    paginationCursorRef.current = paginationCursor;

    React.useEffect(async () => {
        if (isFirstTimeDidMountRef && isLoading) {
            await dispatch(fetchVideos(searchValue, paginationCursor));
            setIsLoading(false);
        }

        isFirstTimeDidMountRef.current = true;
    }, [isLoading]);

    React.useEffect(() => {
        const scrollHandler = (e) => {
            if (
                e.target.documentElement.scrollHeight -
                    (e.target.documentElement.scrollTop + window.innerHeight) <
                    100 &&
                paginationCursorRef.current
            ) {
                setIsLoading(true);
            }
        };
        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const handleFavoritesButtonVideoClick = async (id, isFavorite) => {
        if (!isFavorite) {
            return dispatch(addToFavorites(id));
        }
        return dispatch(removeFromFavorites(id));
    };

    return (
        <div className="container">
            <Title className={styles.title}>
                По запросу {searchValue ? <span>{`"${searchValue}"`}</span> : <span>"ничего"</span>}{' '}
                {items.length > 0 && 'найдены видео канала'}{' '}
                {items.length > 0 && <span>{`"${items[0].user_name}"`}</span>}
                {items.length === 0 && 'не нашлись видео'}
            </Title>
            <div className={styles.row}>
                {items.length > 0 &&
                    items.map((item) => (
                        <div className={styles.column} key={item.id}>
                            <VideoCard
                                {...item}
                                onFavoritesButtonClick={handleFavoritesButtonVideoClick}
                                isFavorite={favoriteItemsIds.includes(item.id)}
                            />
                        </div>
                    ))}
            </div>
            {isLoading && <Title className={styles.title}>Загрузка...</Title>}
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, pathname, query }) => {
    const { search } = query;
    store.dispatch(clearVideos());
    await store.dispatch(fetchVideos(search));
    return {
        props: {
            searchValue: search ? search : '',
        },
    };
});
