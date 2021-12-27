import styled from 'styled-components';

interface IButtonProps {
  secondary?: boolean;
}

const Button = styled.button<IButtonProps>`
  border: none;
  padding: 0.25rem 1.25rem;
  background: ${(props) =>
    props.secondary ? 'var(--clr-btn-s)' : 'var(--clr-btn-p)'};
  border-radius: 5px;
  font-family: inherit;
  font-size: inherit;

  &:hover {
    box-shadow: 0 0 5px hsla(0, 0%, 50%, 1);
  }

  &:active {
    box-shadow: inset 0 0 5px hsla(0, 0%, 50%, 0.5);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 5px hsla(0, 0%, 50%, 1);
  }
`;

export default Button;
