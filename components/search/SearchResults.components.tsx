import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LoaderSpinnerSearch } from '../LoaderSpinnerSearch.components';
import { FiChevronLeft } from 'react-icons/fi';

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

export const SearchResults = ({
  resultCompany,
  resultPrice,
  handleAdd,
  isLoading,
}: any) => {
  const [buttonIsDisabled, setButtonIsDisabled] = useState<any>(true);

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

  const percChange = (resultPrice: any) => {
    let pos;
    let neg;

    if (resultPrice.pc > resultPrice.c) {
      neg = perIncrease(resultPrice.c, resultPrice.pc);
      return (
        <span className="bg-red-300 text-red-600 font-bold text-lg px-4 rounded-full flex justify-center items-center md:text-xl">
          -{neg}%
        </span>
      );
    } else if (resultPrice.c > resultPrice.pc) {
      pos = perIncrease(resultPrice.pc, resultPrice.c);
      return (
        <span className="bg-green-400 text-green-800 font-bold text-lg px-4 rounded-full flex justify-center items-center md:text-xl">
          +{pos}%
        </span>
      );
    }
  };

  const dayChange = (resultPrice: any) => {
    let pos = resultPrice.c - resultPrice.pc;
    let neg = resultPrice.pc - resultPrice.c;
    let posString = pos.toString().substring(0, 7);
    let negString = neg.toString().substring(0, 7);

    if (resultPrice.pc > resultPrice.c) {
      return <span className="text-red-500">{`-$${negString}`}</span>;
    } else if (resultPrice.c > resultPrice.pc) {
      return <span className="text-green-700">{`+$${posString}`}</span>;
    }
  };

  useEffect(() => {
    if (!buttonIsDisabled) {
      setTimeout(() => {
        setButtonIsDisabled(true);
      }, 2000);
    }
  }, [buttonIsDisabled]);

  return (
    <>
      {Object.keys(resultCompany).length !== 0 ? (
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-8 md:px-14 pt-10 pb-14 dark:shadow-dark3xl dark:bg-dark flex flex-col gap-3">
          <div
            onClick={() => setButtonIsDisabled(false)}
            className="bg-gray-200 rounded-3xl shadow-md shadow-gray-500 dark:bg-black dark:shadow-dark3xl flex flex-col gap-8 md:gap-5 cursor-pointer group"
          >
            <div className="p-5 flex flex-col gap-10 md:p-8">
              <div className="flex justify-between items-center">
                <a
                  href={resultCompany.weburl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="flex gap-5 items-center">
                    {resultCompany.logo ? (
                      <>
                        <Image
                          src={resultCompany.logo}
                          alt={resultCompany.name}
                          width={56}
                          height={56}
                          className="rounded-full cursor-pointer duration-300 ease-in-out"
                        />
                      </>
                    ) : (
                      <LoaderSpinnerSearch />
                    )}
                    <h1 className="text-3xl font-bold hidden md:block duration-300 ease-in-out">
                      {resultCompany.ticker}
                    </h1>
                  </div>
                </a>
                <div className="flex flex-col items-end">
                  <h1 className="font-bold text-2xl">${resultPrice.c}</h1>
                  <p className="text-sm">{resultCompany.currency}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold md:hidden">
                  {resultCompany.ticker}
                </h1>
                <p className="text-sm md:text-3xl md:font-bold">
                  {resultCompany.name}
                </p>
                <p>&#8729;</p>
                <p className="text-sm md:text-lg">
                  {resultCompany.finnhubIndustry}
                </p>
                <p className="text-sm md:text-lg">{resultCompany.exchange}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-green-700 font-bold text-lg md:text-xl">
                  {dayChange(resultPrice)}
                </p>
                {percChange(resultPrice)}
              </div>
            </div>
            <div className="flex justify-end">
              {buttonIsDisabled ? (
                <button
                  onClick={() => setButtonIsDisabled(false)}
                  className="bg-blue-700 w-14 h-20 md:w-20 rounded-br-3xl rounded-tl-3xl duration-200 ease-in-out flex justify-center items-center group-hover:bg-black dark:group-hover:bg-white"
                >
                  <span className="text-2xl md:text-4xl text-white dark:group-hover:text-black ease-in-out">
                    <FiChevronLeft />
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="bg-blue-700 ml-0 h-20 rounded-bl-3xl rounded-br-3xl rounded-tl-none w-full duration-200 ease-in-out dark:group-hover:bg-white group-hover:bg-black"
                >
                  <span className="text-4xl md:text-5xl text-white dark:group-hover:text-black">
                    +
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
