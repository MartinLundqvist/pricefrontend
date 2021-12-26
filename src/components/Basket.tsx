import styled from 'styled-components';
import { useBasket } from '../contexts/BasketProvider';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Basket = (): JSX.Element => {
  const {
    clearBasket,
    getProductsInBasket,
    getVendorsWithBasket,
    getCheapestBasketVendor,
  } = useBasket();

  return (
    <div>
      <h1>Din korg{getProductsInBasket().length === 0 ? ' är tom' : ''}</h1>
      <Wrapper>
        <div>
          <ul>
            {getProductsInBasket().map((product) => (
              <li key={product.product}>
                {product.product}, {product.vendors.length} affärer, lägsta
                pris: {product.vendors[0].priceOffer}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Affärer som har alla produkter</h3>
          <ul>
            {getVendorsWithBasket().map((vendor) => (
              <li key={vendor.vendor}>
                {vendor.vendor}: {vendor.totalPriceOffer} kr
              </li>
            ))}
          </ul>
          <h3>Billigaste totalköp</h3>
          <ul>
            <li>
              Affär:{' '}
              {getCheapestBasketVendor()
                ? getCheapestBasketVendor().vendor
                : 'None found'}
            </li>
            <li>
              Pris:{' '}
              {getCheapestBasketVendor()
                ? getCheapestBasketVendor().totalPriceOffer
                : 0}
            </li>
          </ul>
        </div>
        <button onClick={() => clearBasket()}>Töm korg!</button>
      </Wrapper>
    </div>
  );
};
