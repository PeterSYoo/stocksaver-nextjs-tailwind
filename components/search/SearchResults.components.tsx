import { Fragment, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

interface Results {
  results: any;
  error: any;
}

interface Result {
  price: number;
  previous_close_price: number;
  ticker: string;
  name: string;
}

export const SearchResults = ({ results, error }: Results) => {
  const dayChange = (result: Result) => {
    let pos = result.price - result.previous_close_price;
    let neg = result.previous_close_price - result.price;
    let posString = pos.toString().substring(0, 7);
    let negString = neg.toString().substring(0, 7);

    if (result.previous_close_price > result.price) {
      return <span className="text-red-500">{`-${negString}`}</span>;
    } else if (result.price > result.previous_close_price) {
      return <span className="text-green-600">{`+${posString}`}</span>;
    }
  };

  return (
    <>
      {error.returned === 0 ? (
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-10 py-10 dark:shadow-none dark:bg-dark flex flex-col gap-3">
          <h1 className="text-center">
            No tickers found, make sure you typed in the right symbol.
          </h1>
        </div>
      ) : null}
      {results.length !== 0 ? (
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-10 pt-6 pb-10 dark:shadow-none dark:bg-dark flex flex-col gap-3">
          {results.map((result: Result) => (
            <Fragment key={result.ticker}>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-start-1 col-span-6 md:grid md:grid-cols-12">
                  <div className="md:col-start-1 md:col-span-3">
                    <span className="text-xl font-bold">{result.ticker}</span>
                  </div>
                  <div className="md:col-start-4 md:col-span-9">
                    <span className="text-xs md:text-sm">{result.name}</span>
                  </div>
                </div>
                <div className="col-start-7 col-span-4 md:grid md:grid-cols-2 flex flex-col items-end">
                  <div>
                    <span className="text-xl font-bold">${result.price}</span>
                  </div>
                  <div>
                    <span className="text-xs md:text-lg">
                      {dayChange(result)}
                    </span>
                  </div>
                </div>
                <div className="col-start-12 col-span-1 flex justify-end">
                  <div className="flex items-center">
                    <button className="dark:text-gray-600 dark:hover:text-white text-gray-500 hover:text-black">
                      <IoIosAddCircleOutline className="text-2xl" />
                    </button>
                  </div>
                </div>
                <div className="border-b border-gray-300 dark:border-gray-700 col-span-12"></div>
              </div>
            </Fragment>
          ))}
        </div>
      ) : null}
    </>
  );
};
