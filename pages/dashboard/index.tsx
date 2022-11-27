import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Profile } from '../../components/dashboard/Profile.components';
import { TickerCards } from '../../components/dashboard/TickerCards.components';
import { WinnersLosers } from '../../components/dashboard/WinnersLosers.components';

const DashboardPage = () => {
  return (
    <>
      <div className="flex flex-col mx-4 gap-6 mt-4 mb-36">
        <div className="mx-4 text-sm">Dashboard</div>
        <Profile />
        <WinnersLosers />
        <TickerCards />
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
    props: {},
  };
};
