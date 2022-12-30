import { Fragment } from 'react';
import { AddTickerCard } from './AddTickerCard.components';
import { TickerCard } from './TickerCard.components';

type LocalTickers = {
  _id: string;
  user: string;
  tickers: string;
  __v: number;
};

type StockData = {
  company: {
    country: string;
    currency: string;
    exchange: string;
    finnhubIndustry: string;
    ipo: string;
    logo: string;
    marketCapitalization: number;
    name: string;
    phone: string;
    shareOutstanding: number;
    ticker: string;
    weburl: string;
  };
  price: {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
  };
};

type TickerCardsProps = {
  tickers: StockData;
  refetch: () => void;
  localTickers: LocalTickers[];
  setDeletedTicker: (arg0: string) => void;
  setWinner: (arg0: StockData | {}) => void;
  setLoser: (arg0: StockData | {}) => void;
};

export const TickerCards = ({
  tickers,
  refetch,
  localTickers,
  setDeletedTicker,
  setWinner,
  setLoser,
}: TickerCardsProps) => {
  console.log(localTickers);
  if (tickers) {
    return (
      <>
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 grid md:grid-cols-3 gap-8 md:gap-x-8 md:px-8 dark:shadow-dark3xl dark:bg-dark items-start md:items-start pb-20 md:pb-10">
          {localTickers?.map((ticker: LocalTickers) => (
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
