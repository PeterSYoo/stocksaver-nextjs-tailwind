import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '../../components/dashboard/Profile.components';
import { TickerCards } from '../../components/dashboard/TickerCards.components';
import { WinnersLosers } from '../../components/dashboard/WinnersLosers.components';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { getUser } from '../../lib/usersHelper';
import { useEffect, useState } from 'react';
import { deleteTickers } from '../../lib/tickersController';

interface Ticker {
  tickers: string;
}

const DashboardPage = ({ session }: any) => {
  const APP_URL: any = process.env.NEXT_PUBLIC_APP_URL;
  const [result, setResult] = useState([]);
  const [tickers] = useState<string[]>([]);
  const [combinedTickers, setCombinedTickers] = useState('');
  const [apiKey] = useState(`${process.env.NEXT_PUBLIC_API_KEY}`);

  const getUserTickers = async (userId: string) => {
    const response = await fetch(`${APP_URL}/api/find-tickers/${userId}`);
    const json = await response.json();

    if (json) {
      json.map((ticker: Ticker) => tickers.push(ticker.tickers));
      let string = tickers.join();
      setCombinedTickers(string);
      return json;
    }

    return {};
  };

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = useQuery(['user'], () => getUser(session.user.id));

  const {
    data: tickersData,
    isLoading: tickersIsLoading,
    isError: tickersIsError,
    error: tickersError,
  } = useQuery(['userTickers'], () => getUserTickers(session.user.id));

  useEffect(() => {
    const fetchFromApi = async () => {
      try {
        const response = await fetch(
          `https://api.stockdata.org/v1/data/quote?symbols=${combinedTickers}&api_token=${apiKey}`
        );
        const json = await response.json();

        if (json) {
          setResult(json.data);
        }

        return {};
      } catch (error) {
        return error;
      }
    };

    if (combinedTickers.length !== 0) {
      if (result.length === 0) {
        fetchFromApi();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinedTickers]);

  if (userIsLoading || tickersIsLoading) return <LoaderSpinner />;
  if (userIsError) return <>{userError}</>;
  if (tickersIsError) return <>{tickersError}</>;

  // console.log(result, 'results');
  console.log(tickersData, 'tickers');

  return (
    <>
      <div className="mx-4 md:mx-10">
        <div className="flex flex-col md:max-w-[1024px] gap-6 mt-4 mb-36 mx-auto">
          <div className="mx-4 text-sm text-gray-600">
            <Link
              href="/dashboard"
              className="dark:hover:text-white hover:text-black"
            >
              dashboard
            </Link>
          </div>
          <Profile user={userData} />
          <div className="md:hidden">
            <WinnersLosers results={result} />
          </div>
          <TickerCards results={result} />
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
