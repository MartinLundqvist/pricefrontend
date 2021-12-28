import styled from 'styled-components';
import { useAlert } from '../../contexts/AlertProvider';
import { useBasket } from '../../contexts/BasketProvider';
import Button from '../elements/Button';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const ItemsWrapper = styled.div``;

interface IItemProps {
  headline?: boolean;
}

const Item = styled.div<IItemProps>`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  font-weight: ${(props) => (props.headline ? '500' : '300')};

  div:nth-child(1) {
    flex: 1;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

export const Basket = (): JSX.Element => {
  const {
    clearBasket,
    getProductsInBasket,
    getVendorsWithBasket,
    getCheapestBasketVendor,
  } = useBasket();

  const { confirm } = useAlert();

  const handleClearBasketClick = async () => {
    const confirmed = await confirm(
      'Are you sure you want to clear the basket?'
    );

    if (confirmed) clearBasket();
  };

  return (
    <Wrapper>
      <ItemsWrapper>
        <Item headline>
          <div>Items in basket</div>
          <div>Best offer</div>
        </Item>
        {getProductsInBasket().map((product) => (
          <Item key={product.product}>
            <div>{product.product}</div>
            <div>{product.vendors[0].priceOffer.toLocaleString()} kr</div>
          </Item>
        ))}
      </ItemsWrapper>
      <ItemsWrapper>
        <Item headline>
          <div>Vendors offering all items</div>
          <div>Total price</div>
        </Item>
        {getVendorsWithBasket().map((vendor) => (
          <Item key={vendor.vendor}>
            <div>{vendor.vendor}</div>
            <div>{vendor.totalPriceOffer.toLocaleString()} kr</div>
          </Item>
        ))}
      </ItemsWrapper>
      <ItemsWrapper>
        <Item headline>
          <div>Best total offer</div>
          <div>Total price</div>
        </Item>
        <Item>
          <div>
            {getCheapestBasketVendor()
              ? getCheapestBasketVendor().vendor
              : 'None found'}
          </div>
          <div>
            {getCheapestBasketVendor()
              ? getCheapestBasketVendor().totalPriceOffer.toLocaleString() +
                ' kr'
              : 0}
          </div>
        </Item>
      </ItemsWrapper>
      <ButtonsWrapper>
        <Button>Go to vendor</Button>
        <Button secondary onClick={() => handleClearBasketClick()}>
          Empty basket
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};
