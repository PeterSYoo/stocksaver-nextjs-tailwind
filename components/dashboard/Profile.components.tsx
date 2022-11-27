import Image from 'next/image';
import { Playfair_Display } from '@next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
});

export const Profile = () => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-4 grid grid-cols-2">
        <Image
          src="https://i.imgur.com/1WUaIla.png"
          width={141}
          height={141}
          alt="profile image"
        />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl mb-1">
            <span className={playfair.className}>@username</span>
          </h1>
          <h1 className="font-bold text-xl">
            Tickers: <span className="font-normal">13</span>
          </h1>
        </div>
      </div>
    </>
  );
};
