import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  ButtonLabelStyled,
} from '../Button/IconButton/IconButton.styled';
import {
  SearchFormStyled,
  SearchHeaderStyled,
  SearchInputStyled,
} from './Searchbar.styled';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState(``);

  const handleInputChange = e => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(query);

    if (query.trim() === ``) {
      return;
    }
    onSubmit(query);
  };

  return (
    <SearchHeaderStyled>
      <SearchFormStyled onSubmit={handleSubmit}>
        <SearchInputStyled
          name="search_input"
          value={query}
          onChange={handleInputChange}
        />
        <ButtonStyled>
          <ButtonLabelStyled />
        </ButtonStyled>
      </SearchFormStyled>
    </SearchHeaderStyled>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
