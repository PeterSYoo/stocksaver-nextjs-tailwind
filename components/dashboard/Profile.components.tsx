import Image from 'next/image';
import { Playfair_Display } from '@next/font/google';
import { WinnersCard } from './WinnersCard.components';
import { LosersCard } from './LosersCard.components';

const playfair = Playfair_Display({
  subsets: ['latin'],
});

export const Profile = ({ user, winner, loser, tickers }: any) => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-10 py-7 grid grid-cols-2 md:grid-cols-12 dark:shadow-dark3xl dark:bg-dark mx-auto">
        <div className="flex flex-col items-center justify-center md:col-start-1 md:col-span-2 md:gap-3">
          <div className="bg-gray-200 h-36 w-36 rounded-full shadow-md shadow-gray-500 dark:bg-black dark:shadow-dark3xl"></div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-1 hidden md:block">
              <span className={playfair.className}>
                <span className="text-blue-700 dark:text-blue-400">@</span>
                {user?.username}
              </span>
            </h1>
            <h1 className="text-md hidden md:block">
              Tickers:{' '}
              <span className="dark:text-red-500 text-red-600 font-bold">
                {tickers?.length}
              </span>
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:col-start-3 md:col-span-10">
          <h1 className="text-2xl font-bold mb-1 md:hidden">
            <span className={playfair.className}>@{user?.username}</span>
          </h1>
          <h1 className="text-md md:hidden">
            Tickers: <span className="font-normal">{tickers?.length}</span>
          </h1>
          <div className="md:flex gap-10 hidden ml-12 justify-center">
            <WinnersCard winner={winner} />
            <LosersCard loser={loser} />
          </div>
        </div>
      </div>
    </>
  );
};
