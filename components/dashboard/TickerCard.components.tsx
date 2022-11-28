import { TiDelete } from 'react-icons/ti';

export const TickerCard = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="bg-[#F1F6FA] flex flex-col justify-between rounded-3xl shadow-md shadow-gray-500 px-3 py-4 h-36 dark:shadow-none dark:bg-black">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-sm">AAPL</span>
              <span className="text-xs">Apple Inc</span>
            </div>
            <div className="text-sm font-bold">$148.28</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-end text-xs">Daily</div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-green-800">$1.50</span>
              <span className="text-xs font-bold bg-green-300 text-green-800 px-2 py-1 rounded-full">
                +2.25%
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="text-2xl text-red-600 hover:text-black dark:hover:text-white dark:bg-black dark:aspect-square p-[2px] rounded-xl bg-[#F1F6FA] shadow shadow-gray-500 dark:shadow-none">
            <TiDelete />
          </button>
        </div>
      </div>
    </>
  );
};
