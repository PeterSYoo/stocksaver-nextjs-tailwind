import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { getCompany, getPrice } from '../../lib/dashboardHelper';
import { LoaderSpinner } from '../LoaderSpinner.components';
import { AddTickerCard } from './AddTickerCard.components';
import { TickerCard } from './TickerCard.components';

export const TickerCards = ({ tickers }: any) => {
  if (tickers) {
    return (
      <>
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-x-8 md:px-8 dark:shadow-dark3xl dark:bg-dark items-start md:items-start">
          {tickers?.map((ticker: any) => (
            <Fragment key={ticker.tickers}>
              <TickerCard ticker={ticker.tickers} />
            </Fragment>
          ))}
          <button>
            <AddTickerCard />
          </button>
        </div>
      </>
    );
  } else {
    return null;
  }
};
