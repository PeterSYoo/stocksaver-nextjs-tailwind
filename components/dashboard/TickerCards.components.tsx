import { AddTickerCard } from './AddTickerCard.components';
import { TickerCard } from './TickerCard.components';

export const TickerCards = () => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-x-8 md:px-8 dark:shadow-none dark:bg-dark md:items-start">
        <TickerCard />
        <TickerCard />
        <TickerCard />
        <TickerCard />
        <button>
          <AddTickerCard />
        </button>
      </div>
    </>
  );
};
