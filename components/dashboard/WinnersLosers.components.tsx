import { LosersCard } from './LosersCard.components';
import { WinnersCard } from './WinnersCard.components';

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

type WinnersLosersProps = {
  winner: StockData;
  loser: StockData;
};

export const WinnersLosers = ({ winner, loser }: WinnersLosersProps) => {
  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-7 py-7 flex flex-col gap-7 dark:shadow-none dark:bg-dark">
        <WinnersCard winner={winner} />
        <LosersCard loser={loser} />
      </div>
    </>
  );
};
