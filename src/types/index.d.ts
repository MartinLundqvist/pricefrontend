/**
 * product: Refers to the product which matched the users search string.
 * prodoctOffer: Refers to the exact name of the matached vendor offer (which may differ, and we have to allow the user to be the judge)
 */

export interface IStore {
  products: IStoreProduct[];
  vendors: IStoreVendor[];
}

export interface IStoreProduct {
  product: string;
  vendors: {
    vendor: string;
    productOffer: string;
    priceOffer: number;
  }[];
}

export interface IStoreVendor {
  vendor: string;
  products: {
    product: string;
    productOffer: string;
    priceOffer: number;
  }[];
  totalPriceOffer: number;
}
