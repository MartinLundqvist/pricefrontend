import { useEffect, useState } from 'react';
import he from 'he';
import styled from 'styled-components';
import { Basket } from './components/Basket';
import { SearchResults } from './components/SearchResults';
import { useSearch } from './contexts/SearchProvider';

const Wrapper = styled.div`
  position: relative;
  margin: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5rem;
`;

function App() {
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
      <div>
        <h1>Sök efter en produkt</h1>
        <input
          type='text'
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <button disabled={isLoading} onClick={() => handleSearchClick()}>
          Sök!
        </button>
        <button onClick={() => handleClearClick()}>Rensa!</button>
        <SearchResults />
      </div>
      <div>
        <Basket />
      </div>
    </Wrapper>
  );
}

export default App;
