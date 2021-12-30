import styled from 'styled-components';
import { mobile } from '../elements/Mixins';
import BasketButton from './BasketButton';
import { useNavigation } from '../../contexts/NavigationProvider';
import SearchButton from './SearchButton';

const Wrapper = styled.div`
  position: relative;
  height: var(--header-height);
  padding: 0 var(--padding) 0 var(--padding);
  background-color: var(--clr-fg);
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 500;

  &.mobile {
    padding: 0 var(--padding-mobile) 0 var(--padding-mobile);
  }
`;

const Header = (): JSX.Element => {
  const { isMobile, activePage } = useNavigation();
  return (
    <Wrapper className={isMobile ? 'mobile' : ''}>
      Price Scraper
      {isMobile && activePage === 'search' && <BasketButton />}
      {isMobile && activePage === 'basket' && <SearchButton />}
    </Wrapper>
  );
};

export default Header;
