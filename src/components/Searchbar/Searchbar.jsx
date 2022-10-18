// import { Component } from 'react';
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onSubmitData = e => {
    e.preventDefault();
    onSubmit(query);

    if (query.trim() === '') {
      toast.warn('Please enter your request.', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }

    // setQuery('');
  };

  const onInputChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={onSubmitData}>
        <SearchFormButton type="submit" className="SearchForm-button">
          <FaSearch size="20px" />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
          value={query}
        />
      </SearchForm>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
