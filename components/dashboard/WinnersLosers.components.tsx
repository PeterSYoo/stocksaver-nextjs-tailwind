import { LosersCard } from './LosersCard.components';
import { WinnersCard } from './WinnersCard.components';

export const WinnersLosers = ({ winner, loser }: any) => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-7 py-7 flex flex-col gap-7 dark:shadow-none dark:bg-dark">
        <WinnersCard winner={winner} />
        <LosersCard loser={loser} />
      </div>
    </>
  );
};
