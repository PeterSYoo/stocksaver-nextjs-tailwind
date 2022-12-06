import Image from 'next/image';
import { FaSadTear } from 'react-icons/fa';
import { LoaderSpinnerSearch } from '../LoaderSpinnerSearch.components';

export const WinnersCard = ({ winner }: any) => {
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

  const percChange = (price: any) => {
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

  const dayChange = (price: any) => {
    let pos = price?.c - price?.pc;
    let neg = price?.pc - price?.c;
    let posString = pos.toString().substring(0, 7);
    let negString = neg.toString().substring(0, 7);

    if (price?.pc > price?.c) {
      return (
        <span className="text-red-500 text-base md:text-sm">{`-$${negString}`}</span>
      );
    } else if (price?.c > price?.pc) {
      return (
        <span className="text-green-700 text-base md:text-sm">{`+$${posString}`}</span>
      );
    }
  };

  const checkIfWinner = (price: any) => {
    let pos;
    let neg;

    if (price?.pc > price?.c || price === undefined || price) {
      neg = perIncrease(price?.c, price?.pc);
      return (
        <>
          <div className="bg-gray-200 h-56 rounded-3xl px-6 py-4 shadow-md shadow-gray-500 dark:shadow-dark3xl flex flex-col md:w-72 dark:bg-black">
            <div className="flex justify-center items-center font-bold h-full gap-3">
              No Winners <FaSadTear className="text-3xl" />
            </div>
          </div>
        </>
      );
    } else if (price?.c > price?.pc) {
      pos = perIncrease(price?.pc, price?.c);
      return (
        <>
          <a
            href={winner?.company?.weburl}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-gray-200 h-56 rounded-3xl px-6 py-4 shadow-md shadow-gray-500 dark:shadow-dark3xl flex flex-col md:w-72 dark:bg-black">
              <div className="flex justify-center font-bold">
                Top Winner of the Day
              </div>
              <div className="flex flex-col h-full justify-center items-center gap-1">
                {winner.company.log ? (
                  <Image
                    src={winner?.company?.logo}
                    alt={winner?.company?.name}
                    width={75}
                    height={75}
                    className="rounded-full group-hover:w-24 duration-300 ease-in-out"
                  />
                ) : (
                  <div className="mb-2">
                    <LoaderSpinnerSearch />
                  </div>
                )}
                <h1 className="text-md font-bold ">{winner?.company?.name}</h1>
              </div>
              <div className="flex justify-between items-end">
                <p className="font-bold text-md text-green-900">
                  {dayChange(winner?.price)}
                </p>
                <div className="font-bold text-md text-green-900rounded-full">
                  {percChange(winner?.price)}
                </div>
              </div>
            </div>
          </a>
        </>
      );
    }
  };

  return <>{checkIfWinner(winner?.price)}</>;
};
