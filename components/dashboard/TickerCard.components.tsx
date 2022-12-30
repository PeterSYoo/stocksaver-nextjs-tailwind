import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { deleteTicker } from '../../lib/dashboardHelper';
import { LoaderSpinner } from '../LoaderSpinner.components';
import { LoaderSpinnerSearch } from '../LoaderSpinnerSearch.components';
import { FiChevronLeft } from 'react-icons/fi';

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

type TickerCardProps = {
  ticker: string;
  id: string;
  refetch: () => void;
  setDeletedTicker: (arg0: string) => void;
  setWinner: (arg0: StockData | {}) => void;
  setLoser: (arg0: StockData | {}) => void;
};

export const TickerCard = ({
  ticker,
  id,
  refetch,
  setDeletedTicker,
  setWinner,
  setLoser,
}: TickerCardProps) => {
  const [apiKey] = useState(process.env.NEXT_PUBLIC_API_KEY);
  const [company, setCompany] = useState<any>({});
  const [price, setPrice] = useState<any>({});
  const [key, setKey] = useState('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true);

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

    if (price.pc > price.c) {
      neg = perIncrease(price.c, price.pc);
      return (
        <span className="bg-red-300 text-red-600 font-bold text-base px-4 rounded-full flex justify-center items-center md:text-sm">
          -{neg}%
        </span>
      );
    } else if (price.c > price.pc) {
      pos = perIncrease(price.pc, price.c);
      return (
        <span className="bg-green-400 text-green-800 font-bold text-base px-4 rounded-full flex justify-center items-center md:text-sm">
          +{pos}%
        </span>
      );
    }
  };

  const dayChange = (price: Price) => {
    let pos = price.c - price.pc;
    let neg = price.pc - price.c;
    let posString = pos.toString().substring(0, 7);
    let negString = neg.toString().substring(0, 7);

    if (price.pc > price.c) {
      return (
        <span className="text-red-500 text-base md:text-sm">{`-$${negString}`}</span>
      );
    } else if (price.c > price.pc) {
      return (
        <span className="text-green-700 text-base md:text-sm">{`+$${posString}`}</span>
      );
    }
  };

  const handleDelete = async (id: string, ticker: string) => {
    await mutateAsync(id);
    await refetch();
    setDeletedTicker(ticker);
    setWinner({});
    setLoser({});
  };

  const { mutateAsync, isLoading } = useMutation(deleteTicker);

  useEffect(() => {
    const getData = async (ticker: string) => {
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
          // console.log(jsonPrice);
          // console.log(jsonCompany);
          setCompany(jsonCompany);
          setPrice(jsonPrice);
          setKey(id);
        }

        return {};
      } catch (error) {
        return error;
      }
    };

    getData(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  useEffect(() => {
    if (!buttonIsDisabled) {
      setTimeout(() => {
        setButtonIsDisabled(true);
      }, 2000);
    }
  }, [buttonIsDisabled]);

  return (
    <>
      {company.name ? (
        <>
          {Object.keys(company).length !== 0 ? (
            <>
              <div
                onClick={() => setButtonIsDisabled(false)}
                className="bg-gray-200 rounded-3xl shadow-md shadow-gray-500 dark:bg-black dark:shadow-dark3xl flex flex-col gap-10 md:gap-0 md:h-80 justify-between md:w-64 md:mx-auto cursor-pointer group"
              >
                <div className="p-4 flex flex-col gap-9">
                  <div className="flex justify-between items-center group">
                    <a
                      href={company.weburl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex gap-3 items-center">
                        {company?.logo ? (
                          <>
                            <Image
                              src={company.logo}
                              alt={company.name}
                              width={50}
                              height={50}
                              className="rounded-full cursor-pointer duration-200 ease-in-out"
                            />
                          </>
                        ) : (
                          <LoaderSpinnerSearch />
                        )}

                        <div className="flex flex-col">
                          <h1 className="text-xl font-bold">
                            {company.ticker}
                          </h1>
                          <p className="text-xs">{company.name}</p>
                        </div>
                      </div>
                    </a>
                    <div className="flex flex-col items-end">
                      <h1 className="text-sm font-bold">${price.c}</h1>
                      <p className="text-xs">{company.currency}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-sm">{company.finnhubIndustry}</p>
                    <p className="text-xs">{company.exchange}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-green-700 font-bold text-lg md:text-xl flex items-center">
                      {dayChange(price)}
                    </p>
                    {percChange(price)}
                  </div>
                </div>
                <div className="flex justify-end">
                  {isLoading ? (
                    <LoaderSpinner />
                  ) : (
                    <div className="w-full flex justify-end">
                      {buttonIsDisabled ? (
                        <button
                          onClick={() => setButtonIsDisabled(false)}
                          className="bg-red-600 w-14 h-12 md:w-16 rounded-br-3xl rounded-tl-3xl duration-200 ease-in-out group-hover:bg-black dark:group-hover:bg-white"
                        >
                          <span className="text-2xl text-white dark:group-hover:text-black flex justify-center items-center">
                            <FiChevronLeft />
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(id, ticker)}
                          className="bg-red-600 ml-0 h-12 rounded-bl-3xl rounded-br-3xl rounded-tl-none w-full duration-200 ease-in-out dark:group-hover:bg-white group-hover:bg-black"
                        >
                          <span className="text-4xl text-white dark:group-hover:text-black">
                            -
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <LoaderSpinner />
          )}
        </>
      ) : (
        <>
          <div
            onClick={() => setButtonIsDisabled(false)}
            className="bg-gray-200 rounded-3xl shadow-md shadow-gray-500 dark:bg-black dark:shadow-dark3xl flex flex-col gap-10 md:gap-0 md:h-80 justify-between md:w-64 md:mx-auto cursor-pointer group"
          >
            <div className="flex justify-center items-center h-full">
              <LoaderSpinnerSearch />
            </div>
            <div className="flex justify-end">
              {isLoading ? (
                <LoaderSpinner />
              ) : (
                <div className="w-full flex justify-end">
                  {buttonIsDisabled ? (
                    <button
                      onClick={() => setButtonIsDisabled(false)}
                      className="bg-red-600 w-14 h-12 md:w-16 rounded-br-3xl rounded-tl-3xl duration-200 ease-in-out group-hover:bg-black dark:group-hover:bg-white"
                    >
                      <span className="text-2xl text-white dark:group-hover:text-black flex justify-center items-center">
                        <FiChevronLeft />
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(id, ticker)}
                      className="bg-red-600 ml-0 h-12 rounded-bl-3xl rounded-br-3xl rounded-tl-none w-full duration-200 ease-in-out dark:group-hover:bg-white group-hover:bg-black"
                    >
                      <span className="text-4xl text-white dark:group-hover:text-black">
                        -
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
