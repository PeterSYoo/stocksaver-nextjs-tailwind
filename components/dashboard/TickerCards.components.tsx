import { AddTickerCard } from './AddTickerCard.components';
import { TickerCard } from './TickerCard.components';

export const TickerCards = () => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-4 grid grid-cols-2 gap-4">
        <TickerCard />
        <TickerCard />
        <AddTickerCard />
      </div>
    </>
  );
};
