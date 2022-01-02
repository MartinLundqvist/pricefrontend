import styled from 'styled-components';

const SearchResultCard = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'product-offer product-offer-price'
    'vendor select-offer';
  background: var(--clr-fg);
  padding: 0.25rem 1rem 0.25rem 1rem;
  border-radius: 5px;
  gap: 0.9rem;

  &:hover {
    box-shadow: 0 0 5px hsla(0, 0%, 50%, 1);
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
    font-size: 0.9rem;
  }

  .select-offer {
    position: relative;
    grid-area: select-offer;
    justify-self: end;
    align-self: start;

    appearance: none;
    background-color: var(--clr-fg);
    margin: 0;
    color: currentColor;
    width: 0.9rem;
    height: 0.9rem;
    border: 1px solid currentColor;
    border-radius: 0.15rem;

    &::before {
      position: absolute;
      content: '';
      width: 110%;
      height: 110%;
      background-color: var(--clr-txt);
      transform: scale(0);
      clip-path: polygon(2% 63%, 46% 99%, 100% 17%, 77% 4%, 43% 72%, 19% 40%);
      transition: transform 0.1s ease-in-out;
    }

    &:checked::before {
      transform: scale(1);
    }
  }
`;

export default SearchResultCard;
