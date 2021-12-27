import { IResponse } from 'price-scraper-common';
import { useState } from 'react';
import styled from 'styled-components';
import { useBasket } from '../contexts/BasketProvider';
import { useSearch } from '../contexts/SearchProvider';
import { IStoreProduct } from '../types';
import Button from './Button';
import Select from './Select';

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const SearchResultCard = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  grid-template-columns: 5rem auto auto;
  grid-template-rows: 2fr 1fr;
  grid-template-areas:
    'image product-offer product-offer-price'
    'image vendor select-offer';
  background: var(--clr-fg);
  padding: 0.25rem 1rem 0.25rem 1rem;
  border-radius: 5px;
  gap: 1rem;

  &:hover {
    box-shadow: 0 0 5px hsla(0, 0%, 50%, 1);
  }

  .image {
    width: 100%;
    height: 100%;
    grid-area: image;
    object-fit: cover;
    object-position: center;
  }

  .product-offer {
    grid-area: product-offer;
  }
  .product-offer-price {
    grid-area: product-offer-price;
    justify-self: end;
  }
  .vendor {
    grid-area: vendor;
  }
  .select-offer {
    position: relative;
    grid-area: select-offer;
    justify-self: end;
    align-self: center;

    appearance: none;
    background-color: var(--clr-fg);
    margin: 0 0.25em 0 0;
    color: currentColor;
    width: 1em;
    height: 1em;
    border: 1px solid currentColor;
    border-radius: 0.15em;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: var(--clr-txt);
      transform: scale(0);
      transition: transform 0.1s ease-in-out;
    }

    &:checked::before {
      transform: scale(1);
    }
  }
`;

export const SearchResults = (): JSX.Element => {
  const MAX_OFFER_CHARACTERS = 90;
  const [chosenProductOfferIDs, setChosenProductOfferIDs] = useState<string[]>(
    []
  );
  const { data, isLoading, clearSearch } = useSearch();
  const { addProduct } = useBasket();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <></>;

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const productOfferID = event.target.value;
    const newChosenProductOfferIDs = [...chosenProductOfferIDs];

    if (checked && !chosenProductOfferIDs.includes(productOfferID)) {
      newChosenProductOfferIDs.push(productOfferID);
    }

    if (!checked && chosenProductOfferIDs.includes(productOfferID)) {
      newChosenProductOfferIDs.splice(
        newChosenProductOfferIDs.indexOf(productOfferID),
        1
      );
    }

    console.log(newChosenProductOfferIDs);

    setChosenProductOfferIDs(newChosenProductOfferIDs);
  };

  const truncate = (offerString: string): string => {
    if (offerString.length > MAX_OFFER_CHARACTERS) {
      offerString = offerString.substring(0, MAX_OFFER_CHARACTERS) + '... ';
    }

    return offerString;
  };

  const addToBasket = () => {
    const newProduct: IStoreProduct = {
      product: data.product.product,
      vendors: [],
    };

    if (chosenProductOfferIDs.length === 0) {
      alert('You did not select any product offers to add.');
      return;
    }

    chosenProductOfferIDs.forEach((id) => {
      const vendor = data.vendors.find((v) => v.productOfferID === id);
      if (vendor) {
        newProduct.vendors.push({
          vendor: vendor.vendor,
          productOffer: vendor.productOffer,
          productOfferID: id,
          priceOffer: vendor.priceOffer,
        });
      }
    });

    if (newProduct.vendors.length === 0) {
      alert('Found no product offers to add');
      return;
    }

    addProduct(newProduct);
    alert(
      'Added ' +
        newProduct.vendors.length +
        ' offers to the product and put in the basket.'
    );

    setChosenProductOfferIDs([]);
    clearSearch();
  };

  return (
    <>
      <SearchWrapper>
        Matching item: {data.product.product}
        <FilterWrapper>
          Showing{' '}
          <Select>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={20}>30</option>
          </Select>{' '}
          results
        </FilterWrapper>
      </SearchWrapper>
      {data.vendors.map((vendorResult, index) => (
        <SearchResultCard key={index}>
          <img className='image' src='https://source.unsplash.com/200x200/?' />
          <div className='product-offer'>
            {truncate(vendorResult.productOffer)}
          </div>
          <div className='product-offer-price'>
            {vendorResult.priceOffer.toLocaleString()} kr
          </div>
          <div className='vendor'>{vendorResult.vendor}</div>
          <input
            className='select-offer'
            type='checkbox'
            name='productOfferID'
            value={vendorResult.productOfferID}
            checked={chosenProductOfferIDs.includes(
              vendorResult.productOfferID
            )}
            onChange={(e) => handleProductChange(e)}
          />
        </SearchResultCard>
      ))}
      <div>Select the offers to include, or clear and make a new search</div>
      <Button onClick={() => addToBasket()}>Add to basket</Button>
    </>
  );
};
