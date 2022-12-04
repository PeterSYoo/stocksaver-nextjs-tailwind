import Image from 'next/image';

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

  return (
    <>
      {Object.keys(resultCompany).length !== 0 ? (
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-8 md:px-14 pt-10 pb-14 dark:shadow-dark3xl dark:bg-dark flex flex-col gap-3 ">
          <div className="bg-gray-200 rounded-3xl shadow-md shadow-gray-500 dark:bg-black dark:shadow-dark3xl">
            <div className="p-5 flex flex-col gap-10 md:p-8">
              <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                  <Image
                    src={resultCompany.logo}
                    alt={resultCompany.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <h1 className="text-3xl font-bold hidden md:block">
                    {resultCompany.ticker}
                  </h1>
                </div>
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
              <button
                onClick={handleAdd}
                className="bg-blue-700 py-1 w-14 md:w-20 rounded-br-3xl rounded-tl-3xl hover:ml-0 hover:rounded-bl-3xl hover:rounded-tl-none hover:w-full duration-300 cursor-pointer ease-in-out"
              >
                <span className="text-3xl text-white">+</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-10 py-10 dark:shadow-dark3xl dark:bg-dark flex flex-col gap-3">
          <h1 className="text-center text-gray-400 dark:text-gray-500">
            No tickers found.
          </h1>
        </div>
      )}
    </>
  );
};
