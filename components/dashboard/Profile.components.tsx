import Image from 'next/image';
import { Playfair_Display } from '@next/font/google';
import { WinnersCard } from './WinnersCard.components';
import { LosersCard } from './LosersCard.components';

const playfair = Playfair_Display({
  subsets: ['latin'],
});

export const Profile = ({ session }: any) => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-4 grid grid-cols-2 md:grid-cols-12 dark:shadow-none dark:bg-dark">
        <div className="flex flex-col items-center justify-center md:col-start-1 md:col-span-2">
          <Image
            src="https://i.imgur.com/1WUaIla.png"
            width={141}
            height={141}
            alt="profile image"
          />
          <h1 className="text-xl mb-1 hidden md:block">
            <span className={playfair.className}>@{session.username}</span>
          </h1>
          <h1 className="font-bold text-xl hidden md:block">
            Tickers: <span className="font-normal">13</span>
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center md:col-start-3 md:col-span-10">
          <h1 className="text-xl mb-1 md:hidden">
            <span className={playfair.className}>@{session.username}</span>
          </h1>
          <h1 className="font-bold text-xl md:hidden">
            Tickers: <span className="font-normal">13</span>
          </h1>
          <div className="md:flex gap-7 hidden mx-10">
            <WinnersCard />
            <LosersCard />
          </div>
        </div>
      </div>
    </>
  );
};
