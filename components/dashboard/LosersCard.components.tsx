import Image from 'next/image';
import { LoaderSpinnerSearch } from '../LoaderSpinnerSearch.components';
import { FaSmileBeam } from 'react-icons/fa';

type Price = {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
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

type LosersCardProps = {
  loser: StockData;
};

export const LosersCard = ({ loser }: LosersCardProps) => {
  const perIncrease = (a: number, b: number) => {
    let percent;
    if (b !== 0) {
      if (a !== 0) {
        percent = ((b - a) / a) * 100;
      } else {
        percent = b * 100;
      }
    } else {
      percent = -a * 100;
    }
    return percent.toFixed(3);
  };

  const percChange = (price: Price) => {
    let pos;
    let neg;

    if (price?.pc > price?.c) {
      neg = perIncrease(price?.c, price?.pc);
      return (
        <span className="bg-red-300 text-red-600 font-bold text-base px-4 rounded-full flex justify-center items-center md:text-sm">
          -{neg}%
        </span>
      );
    } else if (price?.c > price?.pc) {
      pos = perIncrease(price?.pc, price?.c);
      return (
        <span className="bg-green-400 text-green-800 font-bold text-base px-4 rounded-full flex justify-center items-center md:text-sm">
          +{pos}%
        </span>
      );
    }
  };

  const dayChange = (price: Price) => {
    let pos = price?.c - price?.pc;
    let neg = price?.pc - price?.c;
    let posString = pos.toString().substring(0, 7);
    let negString = neg.toString().substring(0, 7);

    if (price?.pc > price?.c) {
      return (
        <span className="text-red-600 text-base md:text-sm">{`-$${negString}`}</span>
      );
    } else if (price?.c > price?.pc) {
      return (
        <span className="text-green-700 text-base md:text-sm">{`+$${posString}`}</span>
      );
    }
  };

  const checkIfLoser = (price: Price) => {
    let pos;
    let neg;

    if (price?.pc > price?.c) {
      pos = perIncrease(price?.pc, price?.c);
      return (
        <>
          {price?.c ? (
            <>
              <a
                href={loser?.company?.weburl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-gray-200 h-56 rounded-3xl px-6 py-4 shadow-md shadow-gray-500 dark:shadow-dark3xl flex flex-col md:w-72 dark:bg-black">
                  <div className="flex justify-center font-bold">
                    Top Loser of the Day
                  </div>
                  <div className="flex flex-col h-full justify-center items-center gap-1">
                    {loser.company.logo ? (
                      <Image
                        src={loser?.company?.logo}
                        alt={loser?.company?.name}
                        width={75}
                        height={75}
                        className="rounded-full group-hover:w-24 duration-300 ease-in-out"
                      />
                    ) : (
                      <div className="mb-2">
                        <LoaderSpinnerSearch />
                      </div>
                    )}

                    <h1 className="text-md font-bold">
                      {loser?.company?.name}
                    </h1>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="font-bold text-md text-red-700">
                      {dayChange(loser?.price)}
                    </p>
                    <div className="font-bold text-md text-red-700 rounded-full">
                      {percChange(loser?.price)}
                    </div>
                  </div>
                </div>
              </a>
            </>
          ) : (
            <>
              <a
                href={loser?.company?.weburl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-gray-200 h-56 rounded-3xl px-6 py-4 shadow-md shadow-gray-500 dark:shadow-dark3xl flex flex-col md:w-72 dark:bg-black">
                  <div className="flex justify-center font-bold">
                    Top Loser of the Day
                  </div>
                  <div className="flex flex-col h-full justify-center items-center gap-1">
                    {loser?.company?.logo ? (
                      <Image
                        src={loser?.company?.logo}
                        alt={loser?.company?.name}
                        width={75}
                        height={75}
                        className="rounded-full group-hover:w-24 duration-300 ease-in-out"
                      />
                    ) : (
                      <div className="mb-2">
                        <LoaderSpinnerSearch />
                      </div>
                    )}

                    <h1 className="text-md font-bold">
                      {loser?.company?.name}
                    </h1>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="font-bold text-md text-red-700">
                      {dayChange(loser?.price)}
                    </p>
                    <div className="font-bold text-md text-red-700 rounded-full">
                      {percChange(loser?.price)}
                    </div>
                  </div>
                </div>
              </a>
            </>
          )}
        </>
      );
    } else if (price?.c > price?.pc || price === undefined || price) {
      neg = perIncrease(price?.c, price?.pc);
      return (
        <>
          {!price ? (
            <>
              <div className="bg-gray-200 h-56 rounded-3xl px-6 py-4 shadow-md shadow-gray-500 dark:shadow-dark3xl flex flex-col md:w-72 dark:bg-black">
                <div className="flex justify-center items-center font-bold h-full gap-3">
                  <LoaderSpinnerSearch />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-200 h-56 rounded-3xl px-6 py-4 shadow-md shadow-gray-500 dark:shadow-dark3xl flex flex-col md:w-72 dark:bg-black">
                <div className="flex justify-center items-center font-bold h-full gap-3">
                  No Losers <FaSmileBeam className="text-3xl" />
                </div>
              </div>
            </>
          )}
        </>
      );
    }
  };

  return <>{checkIfLoser(loser?.price)}</>;
};
