import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProducts, getProducts } from '../../redux/actions';
import styles from './searchbar.module.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            dispatch(searchProducts(searchTerm));
        } else {
            dispatch(getProducts());
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        dispatch(getProducts());
    };

    return (
        <div className={styles.searchBar}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Buscar..."
                    className={styles.input}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && <button className={styles.clearButton} onClick={clearSearch}>×</button>}
            </div>
            <button className={styles.searchButton} onClick={handleSearch}>
                <i className="fas fa-search">buscar</i>
            </button>
        </div>
    );
};

export default SearchBar;
