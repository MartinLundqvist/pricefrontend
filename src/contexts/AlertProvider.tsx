import { createContext, useContext, useEffect, useState } from 'react';
import AlertCard from '../components/elements/AlertCard';
import ConfirmCard from '../components/elements/ConfirmCard';

interface IAlertContext {
  confirm: (message: string) => Promise<boolean>;
  alert: (message: string) => Promise<boolean>;
}

const AlertContext = createContext<IAlertContext>({} as IAlertContext);

const useAlert = () => useContext(AlertContext);

interface IAlertProviderProps {
  children: React.ReactNode;
}

type TResolveFunction = (value: boolean) => void;

let resolveCallback: TResolveFunction;

const AlertProvider = ({ children }: IAlertProviderProps): JSX.Element => {
  const [isShowingConfirm, setIsShowingConfirm] = useState(false);
  const [isShowingAlert, setIsShowingAlert] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [message, setMessage] = useState('');

  const confirm = async (message: string): Promise<boolean> => {
    setMessage(message);
    setIsShowingConfirm(true);
    setIsClosed(false);

    return new Promise<boolean>((resolve, reject) => {
      resolveCallback = resolve;
    });
  };

  const alert = async (message: string): Promise<boolean> => {
    setMessage(message);
    setIsShowingAlert(true);
    setIsClosed(false);

    return new Promise<boolean>((resolve, reject) => {
      resolveCallback = resolve;
    });
  };

  useEffect(() => {
    if (isClosed && (isShowingConfirm || isShowingAlert)) {
      if (isConfirmed) {
        resolveCallback(true);
      } else {
        resolveCallback(false);
      }
      setIsShowingConfirm(false);
      setIsShowingAlert(false);
    }
  }, [isClosed, isShowingConfirm, isShowingAlert]);

  return (
    <AlertContext.Provider
      value={{
        confirm,
        alert,
      }}
    >
      {children}
      {isShowingConfirm && (
        <ConfirmCard
          message={message}
          setIsConfirmed={setIsConfirmed}
          setIsClosed={setIsClosed}
        />
      )}
      {isShowingAlert && (
        <AlertCard
          message={message}
          setIsConfirmed={setIsConfirmed}
          setIsClosed={setIsClosed}
        />
      )}
    </AlertContext.Provider>
  );
};

export { useAlert, AlertProvider };
