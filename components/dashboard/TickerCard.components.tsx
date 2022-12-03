import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCompany, getPrice } from '../../lib/dashboardHelper';
import { LoaderSpinner } from '../LoaderSpinner.components';

export const TickerCard = ({ ticker }: any) => {
  const [apiKey] = useState(process.env.NEXT_PUBLIC_API_KEY);
  const [company, setCompany] = useState<any>({});
  const [price, setPrice] = useState<any>({});

  useEffect(() => {
    const getData = async (ticker: any) => {
      try {
        const responseCompany = await fetch(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`
        );
        const responsePrice = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`
        );
        const jsonCompany = await responseCompany.json();
        const jsonPrice = await responsePrice.json();

        if (jsonPrice && jsonCompany) {
          console.log(jsonPrice);
          console.log(jsonCompany);
          setCompany(jsonCompany);
          setPrice(jsonPrice);
          // console.log(resultCompany, 'company');
          // console.log(resultPrice, 'price');
        }

        return {};
      } catch (error) {
        return error;
      }
    };

    getData(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  return (
    <>
      {Object.keys(company).length !== 0 ? (
        <>
          <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-8 md:px-14 pt-10 pb-14 dark:shadow-dark3xl dark:bg-dark flex flex-col gap-3 ">
            <div className="bg-gray-200 rounded-3xl shadow-md shadow-gray-500 dark:bg-black dark:shadow-dark3xl">
              {company?.name}
            </div>
          </div>
        </>
      ) : (
        <LoaderSpinner />
      )}
    </>
  );
};
