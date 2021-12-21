import { useEffect, useState } from 'react';
// import { IResponse } from 'price-scraper-common';
import styled from 'styled-components';
import { IStore, IStoreVendor } from '../types';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;

interface IBasketStats {
  vendors: string[];
  cheapestVendor: string;
  minTotalPrice: string;
}

interface IBasketProps {
  store: IStore;
  clearStore: () => void;
}
export const Basket = ({ store, clearStore }: IBasketProps): JSX.Element => {
  const [filteredVendors, setFilteredVendors] = useState<IStoreVendor[]>();

  useEffect(() => {
    // We do this the easy way. Filter out the vendors with the full number of products
    const vendorsWithAllProducts = store.vendors.filter((vendor) => {
      vendor.products.length === store.products.length;
    });

    console.log(vendorsWithAllProducts);

    setFilteredVendors(vendorsWithAllProducts);
  }, [store]);

  return (
    <div>
      <h1>Din korg{store.products.length === 0 ? ' är tom' : ''}</h1>
      <Wrapper>
        <div>
          <ul>
            {store.products.map((product) => (
              <li key={product.product}>
                {product.product}, {product.vendors.length} affärer, lägsta
                pris: {product.vendors[0].priceOffer}
              </li>
            ))}
          </ul>
          <button onClick={() => clearStore()}>Töm korg!</button>
        </div>
        <div>
          <h3>Affärer som har alla produkter</h3>
          <ul>
            {filteredVendors?.map((vendor) => (
              <li key={vendor.vendor}>
                {vendor.vendor}: {vendor.totalPriceOffer} kr
              </li>
            ))}
          </ul>
          <h3>Billigaste totalköp</h3>
          <ul>
            <li>Affär: </li>
            <li>Pris: </li>
          </ul>
        </div>
      </Wrapper>
    </div>
  );
};
