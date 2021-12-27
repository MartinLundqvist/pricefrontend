import { useState } from 'react';
import styled from 'styled-components';
import { useSearch } from '../contexts/SearchProvider';
import Button from './Button';
import Input from './Input';
import { SearchResults } from './SearchResults';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Search = (): JSX.Element => {
  const { searchOffers, isLoading, isError, data, clearSearch } = useSearch();
  const [product, setProduct] = useState<string>('');

  const handleSearchClick = () => {
    searchOffers(product);
  };

  const handleClearClick = () => {
    clearSearch();
    setProduct('');
  };

  return (
    <Wrapper>
      <SearchWrapper>
        Search for offers
        <Input
          type='text'
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          width={30}
        />
        <Button onClick={() => handleSearchClick()}>Search</Button>
        <Button secondary onClick={() => handleClearClick()}>
          Clear
        </Button>
      </SearchWrapper>
      <SearchResults />
    </Wrapper>
  );
};

export default Search;
