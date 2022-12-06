import { Fragment } from 'react';
import { AddTickerCard } from './AddTickerCard.components';
import { TickerCard } from './TickerCard.components';

export const TickerCards = ({
  tickers,
  refetch,
  localTickers,
  setDeletedTicker,
  setWinner,
  setLoser,
}: any) => {
  if (tickers) {
    return (
      <>
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 grid md:grid-cols-3 gap-8 md:gap-x-8 md:px-8 dark:shadow-dark3xl dark:bg-dark items-start md:items-start pb-20 md:pb-10">
          {localTickers?.map((ticker: any) => (
            <Fragment key={ticker._id}>
              <TickerCard
                ticker={ticker.tickers}
                refetch={refetch}
                id={ticker._id}
                setDeletedTicker={setDeletedTicker}
                setWinner={setWinner}
                setLoser={setLoser}
              />
            </Fragment>
          ))}
          <button className="m-auto">
            <AddTickerCard />
          </button>
        </div>
      </>
    );
  } else {
    return null;
  }
};
