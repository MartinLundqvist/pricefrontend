import { IVendorSearchResult } from 'price-scraper-common';

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
  vendors: IVendorSearchResult[];
}

export interface IStoreVendor {
  vendor: string;
  products: {
    product: string;
    productOfferID: string;
    productOffer: string;
    priceOffer: number;
  }[];
  totalPriceOffer: number;
}
