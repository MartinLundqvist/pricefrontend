import { createContext, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

type IActivePage = 'search' | 'basket';

interface INavigationContext {
  isMobile: boolean;
  activePage: IActivePage;
  setActivePage: (activePage: IActivePage) => void;
}

const NavigationContext = createContext<INavigationContext>(
  {} as INavigationContext
);

const useNavigation = () => useContext(NavigationContext);

interface INavigationProviderProps {
  children: React.ReactNode;
}

const NavigationProvider = ({
  children,
}: INavigationProviderProps): JSX.Element => {
  const [activePage, setActivePage] = useState<IActivePage>('search');
  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' });

  return (
    <NavigationContext.Provider value={{ isMobile, activePage, setActivePage }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationProvider, useNavigation };
