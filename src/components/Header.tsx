import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  height: var(--header-height);
  padding: 0 var(--padding) 0 var(--padding);
  background-color: var(--clr-fg);
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.25rem;
  font-weight: 500;
`;

const Header = (): JSX.Element => {
  return <Wrapper>Price Scraper</Wrapper>;
};

export default Header;
