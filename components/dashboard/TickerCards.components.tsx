import { AddTickerCard } from './AddTickerCard.components';
import { TickerCard } from './TickerCard.components';

export const TickerCards = () => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 md:px-8">
        <TickerCard />
        <TickerCard />
        <AddTickerCard />
      </div>
    </>
  );
};
