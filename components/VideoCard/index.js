import React from 'react';
import clsx from 'clsx';

import styles from './VideoCard.module.scss';

import { FavoritesIcon } from '../icons';

export default function VideoCard({
    id,
    url,
    thumbnail_url,
    title,
    isFavorite,
    onFavoritesButtonClick,
}) {
    const [isDisabledFavoritesBtn, setIsDisabledFavoritesBtn] = React.useState(false);
    const cleanupFunctionRef = React.useRef(false);

    React.useEffect(() => {
        return () => (cleanupFunctionRef.current = true);
    }, []);

    const thumbnailUrlWithSize = thumbnail_url.replace('%{width}x%{height}', '400x250');

    const handleFavoritesButtonClick = async (e) => {
        e.preventDefault();
        if (onFavoritesButtonClick) {
            setIsDisabledFavoritesBtn(true);
            await onFavoritesButtonClick(id, isFavorite);
            if (!cleanupFunctionRef.current) {
                setIsDisabledFavoritesBtn(false);
            }
        }
    };

    return (
        <a href={url} className={styles.videoCard} target="_blank">
            <div className={styles.image}>
                <img src={thumbnailUrlWithSize} />
            </div>
            <div className={styles.hoverBlock}>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.favoritesButtonWrapper}>
                <FavoritesIcon
                    className={clsx(
                        styles.favoritesButton,
                        isDisabledFavoritesBtn && styles.disabled,
                    )}
                    hv
                    active={isFavorite}
                    onClick={handleFavoritesButtonClick}
                />
            </div>
        </a>
    );
}
