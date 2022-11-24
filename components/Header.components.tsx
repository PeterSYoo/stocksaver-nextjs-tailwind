import { Playfair_Display } from '@next/font/google';
import { ThemeButton } from './ThemeButton.components';
import { FiLogIn } from 'react-icons/fi';

const playfair = Playfair_Display({
  weight: '700',
});

export const Header = () => {
  return (
    <>
      <div className="min-w-screen mx-auto md:max-w-[768px] flex justify-between mt-5 mb-10">
        <button className="text-3xl">
          <h1 className={playfair.className}>Stocksaver</h1>
        </button>
        <div className="flex items-center gap-20">
          <ThemeButton />
          <button>
            <FiLogIn size={33} />
          </button>
        </div>
      </div>
    </>
  );
};
