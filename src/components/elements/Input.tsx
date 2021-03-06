import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: inherit;
  padding: 0.1rem 0.25rem 0.1rem 0.25rem;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 5px hsla(0, 0%, 50%, 1);
  }

  &:hover {
    box-shadow: 0 0 5px hsla(0, 0%, 50%, 1);
  }
`;

export default Input;
