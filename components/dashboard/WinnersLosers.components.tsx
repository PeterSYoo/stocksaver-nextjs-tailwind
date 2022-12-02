import { LosersCard } from './LosersCard.components';
import { WinnersCard } from './WinnersCard.components';

export const WinnersLosers = ({ results }: any) => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-4 py-4 flex flex-col gap-5 dark:shadow-none dark:bg-dark">
        <WinnersCard />
        <LosersCard />
      </div>
    </>
  );
};
