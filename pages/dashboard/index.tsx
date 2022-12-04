import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { Profile } from '../../components/dashboard/Profile.components';
import { TickerCards } from '../../components/dashboard/TickerCards.components';
import { WinnersLosers } from '../../components/dashboard/WinnersLosers.components';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { useQuery } from '@tanstack/react-query';
import { getUserTickers } from '../../lib/userTickersHelper';

const DashboardPage = ({ session }: any) => {
  const {
    data: userTickers,
    refetch,
    isLoading,
    isError,
    error,
  }: any = useQuery(['userTickers'], () => getUserTickers(session.user.id));

  if (isLoading) return <LoaderSpinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <div className="mx-4 md:mx-10">
        <div className="flex flex-col md:max-w-[1024px] gap-6 mt-4 mb-36 mx-auto">
          <div className="mx-4 text-sm text-gray-600 mt-5 md:mt-0">
            <Link
              href="/dashboard"
              className="dark:hover:text-white hover:text-black"
            >
              dashboard
            </Link>
          </div>
          {/* <Profile user={user?.data} />
          <div className="md:hidden">
            <WinnersLosers />
          </div> */}
          <TickerCards tickers={userTickers} refetch={refetch} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
