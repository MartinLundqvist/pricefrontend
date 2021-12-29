import { createContext, useContext, useEffect, useState } from 'react';
import he from 'he';
import { IResponse } from '@mlundqvi/price-scraper-common';

interface ISearchContext {
  searchOffers: (searchString: string) => void;
  isLoading: boolean;
  isError: boolean;
  data: IResponse | null;
  clearSearch: () => void;
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext);

const useSearch = () => useContext(SearchContext);

interface ISearchProviderProps {
  children: React.ReactNode;
}

const SearchProvider = ({ children }: ISearchProviderProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<IResponse | null>(null);
  const [product, setProduct] = useState('');

  const searchOffers = (searchString: string) => {
    if (searchString.length === 0) return;
    setProduct(he.encode(searchString));
  };

  const clearSearch = () => {
    setProduct('');
    setData(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await fetch('http://localhost:4000/find/' + product);

        if (results.ok) {
          const data: IResponse = await results.json();
          setData(data as IResponse);
        }
      } catch (err) {
        setIsError(true);
        console.log('Something went wrong', err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (product.length > 0) fetchData();
  }, [product]);

  return (
    <SearchContext.Provider
      value={{
        searchOffers,
        isLoading,
        isError,
        data,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { useSearch, SearchProvider };
