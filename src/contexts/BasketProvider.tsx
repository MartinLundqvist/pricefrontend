import { createContext, useContext, useEffect, useState } from 'react';
import { BasketUtils } from '../classes/basket';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IStore, IStoreProduct, IStoreVendor } from '../types';

interface IBasketContext {
  clearBasket: () => void;
  addProduct: (product: IStoreProduct) => void;
  removeProduct: (productName: string) => void;
  removeProductOffer: (productOfferID: string) => void;
  getVendorsWithBasket: () => IStoreVendor[];
  getProductsInBasket: () => IStoreProduct[];
  getCheapestBasketVendor: () => IStoreVendor;
}

const BasketContext = createContext<IBasketContext>({} as IBasketContext);

export const useBasket = () => useContext(BasketContext);

interface IBasketProviderProps {
  children: React.ReactNode;
}

export const BasketProvider = ({
  children,
}: IBasketProviderProps): JSX.Element => {
  const [store, setStore] = useLocalStorage<IStore>('price-scraper-beta', {
    products: [],
    vendors: [],
  });

  const clearBasket = () => {
    if (confirm('Are you sure you want to clear the basket?')) {
      setStore({ products: [], vendors: [] });
    }
  };

  const addProduct = (product: IStoreProduct) => {
    console.log('Basket has received a product to be added:');
    console.log(product);

    // Temporary variables - we are technically recreating the Store
    var products = store.products;
    var vendors = store.vendors;

    // It's a new product by definition, so we will just push it to the products array
    products.push({
      product: product.product,
      vendors: product.vendors,
    });

    // We need to check if the vendors are already in the store from before, before adding the new product to the vendor array,
    product.vendors.forEach((vendor) => {
      const vendorIndex = vendors.findIndex((v) => v.vendor === vendor.vendor);
      if (vendorIndex !== -1) {
        vendors[vendorIndex].products.push({
          product: product.product,
          productOfferID: vendor.productOfferID,
          productOffer: vendor.productOffer,
          priceOffer: vendor.priceOffer,
        });
        vendors[vendorIndex].totalPriceOffer += vendor.priceOffer; // Update the total price
      } else {
        vendors.push({
          vendor: vendor.vendor,
          products: [
            {
              product: product.product,
              productOfferID: vendor.productOfferID,
              productOffer: vendor.productOffer,
              priceOffer: vendor.priceOffer,
            },
          ],
          totalPriceOffer: vendor.priceOffer, // It's a new entry, so this is the only price we have
        });
      }
    });

    setStore({ products, vendors });
  };

  const removeProduct = (productName: string) => {};

  const removeProductOffer = (productOfferID: string) => {};

  const getVendorsWithBasket = (): IStoreVendor[] => {
    return store.vendors.filter(
      (v) => v.products.length === store.products.length
    );
  };

  const getProductsInBasket = (): IStoreProduct[] => {
    return store.products;
  };

  const getCheapestBasketVendor = (): IStoreVendor => {
    return getVendorsWithBasket().sort(
      (a, b) => a.totalPriceOffer - b.totalPriceOffer
    )[0];
  };

  return (
    <BasketContext.Provider
      value={{
        clearBasket,
        addProduct,
        removeProduct,
        removeProductOffer,
        getVendorsWithBasket,
        getProductsInBasket,
        getCheapestBasketVendor,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
