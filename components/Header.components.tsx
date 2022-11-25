import { Playfair_Display } from '@next/font/google';
import { ThemeButton } from './ThemeButton.components';
import { FiLogIn } from 'react-icons/fi';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
});

export const Header = () => {
  return (
    <>
      <div className="min-w-screen mx-auto px-5 md:max-w-[768px] flex justify-between mt-5 mb-10">
        <button className={playfair.className}>
          <h1 className="text-2xl md:text-3xl">Tickersaver</h1>
        </button>
        <div className="flex items-center gap-10">
          <ThemeButton />
          <button>
            <FiLogIn size={27} />
          </button>
        </div>
      </div>
    </>
  );
};
