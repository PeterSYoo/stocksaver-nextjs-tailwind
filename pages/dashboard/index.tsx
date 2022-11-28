import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { Profile } from '../../components/dashboard/Profile.components';
import { TickerCards } from '../../components/dashboard/TickerCards.components';
import { WinnersLosers } from '../../components/dashboard/WinnersLosers.components';
import { authOptions } from '../api/auth/[...nextauth]';

const DashboardPage = () => {
  return (
    <>
      <div className="mx-4 md:mx-10">
        <div className="flex flex-col md:max-w-[1024px] gap-6 mt-4 mb-36 mx-auto">
          <div className="mx-4 text-sm text-gray-600">
            <Link href="/dashboard" className="hover:text-white">
              dashboard
            </Link>
          </div>
          <Profile />
          <div className="md:hidden">
            <WinnersLosers />
          </div>
          <TickerCards />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
};
