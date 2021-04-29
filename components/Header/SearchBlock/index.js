import React from 'react';
import { useRouter } from 'next/router';

import styles from './SearchBlock.module.scss';

import { TextField, Button } from '../../../components/forms';
import { SearchIcon, CrossIcon } from '../../icons';

export default function SearchBlock() {
    const [searchValue, setSearchValue] = React.useState('');
    const { query, push } = useRouter();

    const searchQuery = query.search ? query.search : '';

    React.useEffect(() => {
        setSearchValue(searchQuery);
    }, [searchQuery]);

    const handleTextFieldChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleFormSubmit = (e) => {
        push(`/?search=${searchValue}`);
        e.preventDefault();
    };

    const handleFormReset = () => {
        setSearchValue('');
    };

    return (
        <form onSubmit={handleFormSubmit} className={styles.searchBlock}>
            <div className={styles.textFieldWrapper}>
                <TextField
                    className={styles.textField}
                    placeholder="Введите название канала"
                    value={searchValue}
                    onChange={handleTextFieldChange}
                />
                {searchValue && (
                    <div className={styles.crossReset} onClick={handleFormReset}>
                        <CrossIcon />
                    </div>
                )}
            </div>
            <Button className={styles.button} disabled={!searchValue}>
                <SearchIcon className={styles.searchIcon} />
                <span className={styles.buttonText}>Поиск</span>
            </Button>
        </form>
    );
}
