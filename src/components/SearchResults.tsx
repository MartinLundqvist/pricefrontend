import { IResponse } from 'price-scraper-common';
import { useState } from 'react';
import styled from 'styled-components';
import { useBasket } from '../contexts/BasketProvider';
import { useSearch } from '../contexts/SearchProvider';
import { IStoreProduct } from '../types';

const Wrapper = styled.div`
  ul {
    padding: 0;
  }

  label {
    display: block;

    span {
      color: blue;
      font-weight: bold;
    }
  }
`;

export const SearchResults = (): JSX.Element => {
  const MAX_OFFER_CHARACTERS = 45;
  const [chosenProductOfferIDs, setChosenProductOfferIDs] = useState<string[]>(
    []
  );
  const { data, clearSearch } = useSearch();
  const { addProduct } = useBasket();

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
    <Wrapper>
      <h3>
        Produkt som matchade din sökning:{' '}
        <span style={{ color: 'blue' }}> {data.product.product}</span>
      </h3>
      <h3>
        Erbjudanden som matchade{' '}
        <span style={{ color: 'blue' }}>{data.product.product}</span> (visar
        max. 10 med bästa match överst):
      </h3>
      <ul>
        {data.vendors.map((vendorResult, index) => (
          <label key={index + 0.6}>
            <input
              type='checkbox'
              key={index + 0.5}
              name='productOfferID'
              value={vendorResult.productOfferID}
              checked={chosenProductOfferIDs.includes(
                vendorResult.productOfferID
              )}
              onChange={(e) => handleProductChange(e)}
            />
            {truncate(vendorResult.productOffer)}:{' '}
            <span>{vendorResult.priceOffer.toLocaleString()}kr</span> (
            {vendorResult.vendor})
          </label>
        ))}
      </ul>
      <h3>
        Markera de erbjudanden du önskar koppla till produkten du söker efter
        (eller gör en mer specifik sökning om inga erbjudanden matchar det du
        söker)
      </h3>
      <button onClick={() => addToBasket()}>Lägg i Korgen</button>
    </Wrapper>
  );
};
