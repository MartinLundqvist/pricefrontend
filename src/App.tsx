import { useEffect, useState } from 'react';
// import { useLocalStorage } from './hooks/useLocalStorage';
import he from 'he';
import styled from 'styled-components';
import { Basket } from './components/Basket';
import { SearchResults } from './components/SearchResults';
import { IResponse } from 'price-scraper-common';
// import { IStore } from './types';
import { useBasket } from './contexts/BasketProvider';

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
  const [product, setProduct] = useState<string>('');
  const [doSearch, setDoSearch] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<IResponse | null>(null);
  const { clearBasket } = useBasket();
  // const [storeValues, setStoreValues] = useLocalStorage<IStore>(
  //   'price-scraper-beta',
  //   { products: [], vendors: [] }
  // );
  // // const [basket, setBasket] = useState<IBasket[]>([]);

  const handleClick = () => {
    setDoSearch(true);
  };

  // const updateLocalStorage = (data: IResponse) => {
  //   // Temporary variables - we are technically recreating the Store
  //   var products = storeValues.products;
  //   var vendors = storeValues.vendors;

  //   // It's a new product by definition, so we will just push it
  //   products.push({
  //     product: data.product.product,
  //     vendors: data.vendors,
  //   });

  //   // We need to check if the vendors are already there from before, though, before adding the new product
  //   data.vendors.forEach((vendor) => {
  //     const vendorIndex = vendors.findIndex((v) => v.vendor === vendor.vendor);
  //     if (vendorIndex !== -1) {
  //       vendors[vendorIndex].products.push({
  //         product: data.product.product,
  //         price: vendor.price,
  //       });
  //       vendors[vendorIndex].totalPrice += vendor.price; // Update the total price
  //     } else {
  //       vendors.push({
  //         vendor: vendor.vendor,
  //         products: [
  //           {
  //             product: data.product.product,
  //             price: vendor.price,
  //           },
  //         ],
  //         totalPrice: vendor.price, // It's a new entry, so this is the only price we have
  //       });
  //     }
  //   });

  //   // Like now. We set the totalprice now

  //   setStoreValues({ products, vendors });
  // };

  // const clearLocalStorage = () => {
  //   setStoreValues({ products: [], vendors: [] });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetch(
          'http://localhost:4000/find/' + he.encode(product)
        );

        if (results.ok) {
          const data: IResponse = await results.json();
          setSearchResults(data as IResponse);
          // updateLocalStorage(data as IResponse);
        }
      } catch (err) {
        console.log('Something went wrong', err);
        setSearchResults(null);
      } finally {
        setDoSearch(false);
      }
    };

    if (doSearch) {
      fetchData();
    }
  }, [doSearch]);

  return (
    <Wrapper>
      <div>
        <h1>Sök efter en produkt</h1>
        <input
          type='text'
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <button disabled={doSearch} onClick={() => handleClick()}>
          Sök!
        </button>
        {searchResults && <SearchResults results={searchResults} />}
      </div>
      <div>
        <Basket />
      </div>
    </Wrapper>
  );
}

export default App;
