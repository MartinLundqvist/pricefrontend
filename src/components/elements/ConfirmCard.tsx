import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(10px);
`;

const CardWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30%;
  height: 35%;
  transform: translate(-50%, -50%);
  background: var(--clr-fg);
  border-radius: 5px;
  box-shadow: 0 0 5px hsla(0, 0%, 50%, 1);

  .header {
    position: relative;
    font-weight: 500;
    background: var(--clr-bg);
    padding: 1rem;
  }

  .message {
    position: relative;
    padding: 1rem;
  }

  .buttons {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem;

    > button {
      margin-left: 1rem;
    }
  }
`;

interface IConfirmCardProps {
  message: string;
  setIsConfirmed: (value: boolean) => void;
  setIsClosed: (value: boolean) => void;
}

const ConfirmCard = ({
  message,
  setIsConfirmed,
  setIsClosed,
}: IConfirmCardProps): JSX.Element => {
  const handleOk = () => {
    setIsClosed(true);
    setIsConfirmed(true);
  };

  const handleCancel = () => {
    setIsClosed(true);
    setIsConfirmed(false);
  };

  return (
    <Wrapper>
      <CardWrapper>
        <div className='header'>Confirm</div>
        <div className='message'>{message}</div>
        <div className='buttons'>
          <Button onClick={() => handleOk()}>OK</Button>
          <Button secondary onClick={() => handleCancel()}>
            Cancel
          </Button>
        </div>
      </CardWrapper>
    </Wrapper>
  );
};

export default ConfirmCard;
