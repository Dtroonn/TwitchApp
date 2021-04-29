import React from 'react';
import clsx from 'clsx';

import styles from './Title.module.scss';

export default function Title({ className, children }) {
    return <div className={clsx(styles.title, className)}>{children}</div>;
}
