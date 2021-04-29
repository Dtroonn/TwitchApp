import React from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

export default function Button({ className, disabled, children, onClick }) {
    return (
        <button
            className={clsx(styles.button, className, disabled && styles.disabled)}
            onClick={onClick}>
            {children}
        </button>
    );
}
