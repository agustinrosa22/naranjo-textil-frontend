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

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Buscar..."
                className={styles.input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton} onClick={handleSearch}>
                <i className="fas fa-search">buscar</i>
            </button>
        </div>
    );
};

export default SearchBar;
