import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { getCompany, getPrice } from '../../lib/dashboardHelper';
import { LoaderSpinner } from '../LoaderSpinner.components';
import { AddTickerCard } from './AddTickerCard.components';
import { TickerCard } from './TickerCard.components';

export const TickerCards = ({ tickers, refetch }: any) => {
  if (tickers) {
    return (
      <>
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 grid md:grid-cols-3 gap-8 md:gap-x-8 md:px-8 dark:shadow-dark3xl dark:bg-dark items-start md:items-start pb-20 md:pb-10">
          {tickers?.map((ticker: any) => (
            <Fragment key={ticker._id}>
              <TickerCard
                ticker={ticker.tickers}
                refetch={refetch}
                id={ticker._id}
              />
            </Fragment>
          ))}
          <button className="m-auto">
            <AddTickerCard />
          </button>
        </div>
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-10 py-6 dark:bg-dark max-w-[500px] mx-auto md:max-w-[768px] md:mx-auto dark:shadow-dark3xl">
          <p className="text-sm">
            This app consumes Finnhub&apos;s Stock API. It&apos;s currently
            using the free tier which only allows 60 queries per minute. If you
            see any errors it is because you or someone else has used up the
            allotted 60 queries and will need to wait 1 minute for the cooldown
            to refresh. Each card represents 1 query since the free tier does
            not offer an API endpoint that allows for multiple stock symbols as
            a parameter, so each render is pretty expensive.
          </p>
        </div>
      </>
    );
  } else {
    return null;
  }
};
