import React from 'react';
import clsx from 'clsx';

import styles from './TextField.module.scss';

export default function TextField({ className, ...props }) {
    return <input className={clsx(styles.textField, className)} {...props} />;
}
