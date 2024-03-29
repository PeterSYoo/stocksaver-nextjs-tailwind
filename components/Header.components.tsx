import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Playfair_Display } from '@next/font/google';
import { ThemeButton } from './ThemeButton.components';
import { LoaderSpinner } from './LoaderSpinner.components';
import { MdLogout } from 'react-icons/md';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const Guest = () => {
  // States ------------------------------------------------------------- ***
  return (
    <>
      <header className={`${playfair.variable} font-serif`}>
        <div className="bg-transparent dark:bg-transparent dark:shadow-none">
          <div className="min-w-screen mx-auto px-8 max-w-[375px] md:max-w-[768px] flex justify-between pt-7 md:mb-10 pb-2">
            <Link href="/">
              <button>
                <h1 className="text-2xl md:text-3xl font-bold">tickersaver</h1>
              </button>
            </Link>
            <div className="flex items-center gap-10 md:gap-20">
              <ThemeButton />
              <Link href="/">
                <button className="text-lg md:text-xl font-bold flex justify-center">
                  login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const LoggedIn = () => {
  // States ------------------------------------------------------------- ***
  const router = useRouter();

  // Custom Functions ---------------------------------------------------- ***
  const handleSignout = async () => {
    await signOut();
    router.push('/');
  };

  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <header className={`${playfair.variable} font-serif`}>
        <div className="bg-transparent dark:bg-transparent dark:shadow-none">
          <div className="min-w-screen mx-auto px-8 max-w-[375px] md:max-w-[768px] flex justify-between pt-7 md:mb-10 pb-2">
            <Link href="/">
              <button>
                <h1 className="text-2xl md:text-3xl font-bold">tickersaver</h1>
              </button>
            </Link>
            <div className="flex items-center gap-10 md:gap-20">
              <ThemeButton />
              <button
                onClick={handleSignout}
                className="text-[24px] md:text-[30px] flex justify-center"
              >
                <MdLogout />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export const Header = () => {
  // States ------------------------------------------------------------- ***
  const { status }: { status: string } = useSession();

  // JSX ------------------------------------------------------------------ ***
  if (status === 'loading') {
    return (
      <div className="pl-4">
        <LoaderSpinner />
      </div>
    );
  }
  if (status === 'unauthenticated') return <Guest />;

  return <LoggedIn />;
};
