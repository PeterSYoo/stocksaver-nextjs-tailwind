import { TiDelete } from 'react-icons/ti';
import { deleteTickers } from '../../lib/tickersController';

interface Result {
  price: number;
  prevClose: number;
  ticker: string;
  name: string;
}

interface DayChange {
  price: number;
  prevClose: number;
}

export const TickerCard = ({ ticker, name, price, prevClose }: Result) => {
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

  const percChange = ({ price, prevClose }: DayChange) => {
    let pos;
    let neg;

    if (prevClose > price) {
      neg = perIncrease(price, prevClose);
      return (
        <span className="text-xs font-bold bg-red-300 text-red-600 px-2 py-1 rounded-full">
          -%{neg}
        </span>
      );
    } else if (price > prevClose) {
      pos = perIncrease(prevClose, price);
      return (
        <span className="text-xs font-bold bg-green-300 text-green-800 px-2 py-1 rounded-full">
          +%{pos}
        </span>
      );
    }
  };

  const dayChange = ({ price, prevClose }: DayChange) => {
    let pos = price - prevClose;
    let neg = prevClose - price;
    let posString = pos.toString().substring(0, 7);
    let negString = neg.toString().substring(0, 7);

    if (prevClose > price) {
      return <span className="text-red-500">{`-${negString}`}</span>;
    } else if (price > prevClose) {
      return <span className="text-green-600">{`+${posString}`}</span>;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-[#F1F6FA] flex flex-col justify-between rounded-3xl shadow-md shadow-gray-500 px-3 py-4 h-36 dark:shadow-none dark:bg-black">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-sm">{ticker}</span>
              <span className="text-xs">{name}</span>
            </div>
            <div className="text-sm font-bold">${price}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-end text-xs">Daily</div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-green-800">
                {dayChange({ price, prevClose })}
              </span>
              <div>{percChange({ price, prevClose })}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="text-2xl text-red-600 hover:text-black dark:hover:text-white dark:bg-black dark:aspect-square p-[2px] rounded-md bg-[#F1F6FA] shadow shadow-gray-500 dark:shadow-none">
            <TiDelete />
          </button>
        </div>
      </div>
    </>
  );
};
