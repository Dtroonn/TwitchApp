import React from 'react';

import styles from './Header.module.scss';

import SearchBlock from './SearchBlock';
import { LogoIcon, FavoritesIcon } from '../icons';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.column}>
                        <Link href="/">
                            <a>
                                <LogoIcon />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.column}>
                        <SearchBlock />
                    </div>
                    <div className={styles.column}>
                        <Link href="/favorites">
                            <a className={styles.linkToFavorites}>
                                <FavoritesIcon />
                                Избранное
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
