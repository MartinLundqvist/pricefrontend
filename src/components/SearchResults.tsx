import { useEffect, useState } from 'react';
import { IResponse } from 'price-scraper-common';

interface ISearchResultsProps {
  results: IResponse;
}

export const SearchResults = ({
  results,
}: ISearchResultsProps): JSX.Element => {
  const [productsFound, setProductsFound] = useState<string[]>();

  useEffect(() => {
    const products = new Set<string>();
    results.vendors.forEach((vendor) => products.add(vendor.productOffer));
    setProductsFound(Array.from(products));
  }, [results]);

  return (
    <div>
      <h3>
        Produkt som matchade din sökning:{' '}
        <span style={{ color: 'blue' }}> {results.product.product}</span>
      </h3>
      <h3>
        Erbjudanden som matchade{' '}
        <span style={{ color: 'blue' }}>{results.product.product}</span> (visar
        max. 10 med bästa match överst):
      </h3>
      <ul>
        {productsFound?.map((product, index) => (
          <li key={index + 0.5}>{product}</li>
        ))}
      </ul>
      <h3>
        Markera de erbjudanden du önskar koppla till produkten du söker efter
        (eller gör en mer specifik sökning om inga erbjudanden matchar det du
        söker)
      </h3>
    </div>
  );
};
