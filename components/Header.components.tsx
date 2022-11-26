import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Playfair_Display } from '@next/font/google';
import { ThemeButton } from './ThemeButton.components';
import { MdLogout } from 'react-icons/md';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
});

export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <div className="min-w-screen mx-auto px-8 max-w-[375px] md:max-w-[768px] flex justify-between mt-7 mb-10">
        <Link href="/">
          <button className={playfair.className}>
            <h1 className="text-2xl md:text-3xl">tickersaver</h1>
          </button>
        </Link>
        <div className="flex items-center gap-10 md:gap-20">
          <ThemeButton />
          {session ? (
            <button
              onClick={handleSignout}
              className="text-[24px] md:text-[30px] flex justify-center"
            >
              <MdLogout />
            </button>
          ) : (
            <Link href="/login">
              <button className="text-lg md:text-xl font-bold flex justify-center">
                login
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
