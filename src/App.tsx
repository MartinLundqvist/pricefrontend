import Header from './components/Header';
import Search from './components/Search';
import styled from 'styled-components';
import { Basket } from './components/Basket';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  padding: 1rem var(--padding) 1rem var(--padding);
`;

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Wrapper>
        <Search />
        <Basket />
      </Wrapper>
    </>
  );
};

export default App;
