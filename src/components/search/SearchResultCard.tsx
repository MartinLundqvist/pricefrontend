import styled from 'styled-components';

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

export default SearchResultCard;
