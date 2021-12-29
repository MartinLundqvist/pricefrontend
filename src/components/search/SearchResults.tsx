import { IStoreProduct } from '../../types';
import { useState } from 'react';
import { useAlert } from '../../contexts/AlertProvider';
import { useBasket } from '../../contexts/BasketProvider';
import { useSearch } from '../../contexts/SearchProvider';
import Button from '../elements/Button';
import Select from '../elements/Select';
import SearchResultCard from './SearchResultCard';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const SearchResults = (): JSX.Element => {
  const MAX_OFFER_CHARACTERS = 90;
  const [chosenProductOfferIDs, setChosenProductOfferIDs] = useState<string[]>(
    []
  );
  const { data, isLoading, isError, clearSearch } = useSearch();
  const [noOffersToShow, setNoOffersToShow] = useState(10);
  const { addProduct } = useBasket();
  const { alert } = useAlert();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong. Try again.</div>;

  if (!data) return <div>No results to show.</div>;

  if (data.vendors.length === 0) return <div>No matching products found.</div>;

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

  const addToBasket = async () => {
    const newProduct: IStoreProduct = {
      product: data.product.product,
      vendors: [],
    };

    if (chosenProductOfferIDs.length === 0) {
      await alert('You did not select any product offers to add.');
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
      await alert('Found no product offers to add');
      return;
    }

    addProduct(newProduct);
    await alert(
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
          <Select
            defaultValue={10}
            onChange={(e) => setNoOffersToShow(parseInt(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </Select>{' '}
          results
        </FilterWrapper>
      </SearchWrapper>
      {data.vendors.slice(0, noOffersToShow).map((vendorResult, index) => (
        <SearchResultCard key={index}>
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
