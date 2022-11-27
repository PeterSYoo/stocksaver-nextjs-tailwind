import { LosersCard } from './LosersCard.components';
import { WinnersCard } from './WinnersCard.components';

export const WinnersLosers = () => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-4 py-4 flex flex-col gap-5">
        <WinnersCard />
        <LosersCard />
      </div>
    </>
  );
};
