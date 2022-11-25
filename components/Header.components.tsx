import { Playfair_Display } from '@next/font/google';
import { ThemeButton } from './ThemeButton.components';
import { FiLogIn } from 'react-icons/fi';
import Link from 'next/link';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
});

export const Header = () => {
  return (
    <>
      <div className="min-w-screen mx-auto px-8 max-w-[375px] md:max-w-[768px] flex justify-between mt-5 mb-10">
        <Link href="/">
          <button className={playfair.className}>
            <h1 className="text-2xl md:text-3xl">tickersaver</h1>
          </button>
        </Link>
        <div className="flex items-center gap-10 md:gap-20">
          <ThemeButton />
          <button>
            <FiLogIn size={27} />
          </button>
        </div>
      </div>
    </>
  );
};
