import Header from './components/elements/Header';
import Search from './components/search/Search';
import styled from 'styled-components';
import Basket from './components/basket/Basket';
import { useNavigation } from './contexts/NavigationProvider';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  padding: 1rem var(--padding) 1rem var(--padding);

  &.mobile {
    display: block;
    padding: 1rem var(--padding-mobile) 1rem var(--padding-mobile);
  }
`;

const App = (): JSX.Element => {
  const { isMobile, activePage } = useNavigation();
  return (
    <>
      <Header />
      <Wrapper className={isMobile ? 'mobile' : ''}>
        {!isMobile ? (
          <>
            <Search />
            <Basket />
          </>
        ) : (
          <>
            {activePage === 'search' && <Search />}
            {activePage === 'basket' && <Basket />}
          </>
        )}
      </Wrapper>
    </>
  );
};

export default App;
