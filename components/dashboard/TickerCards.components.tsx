import { Fragment } from 'react';
import { AddTickerCard } from './AddTickerCard.components';
import { TickerCard } from './TickerCard.components';

export const TickerCards = ({ results }: any) => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-x-8 md:px-8 dark:shadow-none dark:bg-dark items-start md:items-start">
        {results?.map((result: any) => (
          <Fragment key={result?.ticker}>
            <TickerCard
              ticker={result?.ticker}
              name={result?.name}
              price={result?.price}
              prevClose={result?.previous_close_price}
            />
          </Fragment>
        ))}
        <button>
          <AddTickerCard />
        </button>
      </div>
    </>
  );
};
