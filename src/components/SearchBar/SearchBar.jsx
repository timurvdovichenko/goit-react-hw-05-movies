import { useState } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchbarContainer,
} from './Searchbar.styled';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit, queryLink }) => {
  const [searchValue, setSearchValue] = useState(queryLink ? queryLink : '');

  const handleChange = e => {
    setSearchValue(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const queryResult = searchValue.trim();

    if (queryResult === '') {
      console.log('queryLink :>> ', queryLink);
      Notify.failure('Please enter query');
      return;
    }

    onSubmit(queryResult);
  };
  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
          value={searchValue}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarContainer>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  queryLink: PropTypes.string,
};
