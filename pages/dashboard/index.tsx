import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { Profile } from '../../components/dashboard/Profile.components';
import { TickerCards } from '../../components/dashboard/TickerCards.components';
import { WinnersLosers } from '../../components/dashboard/WinnersLosers.components';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { useQuery } from '@tanstack/react-query';
import { getUserTickers } from '../../lib/userTickersHelper';
import { getUser } from '../../lib/usersHelper';
import { useEffect, useState } from 'react';

const DashboardPage = ({ session }: any) => {
  const [apiKey] = useState(process.env.NEXT_PUBLIC_API_KEY);
  const [company, setCompany] = useState<any>([{}]);
  const [winner, setWinner] = useState();
  const [loser, setLoser] = useState();

  const user = useQuery(['user'], () => getUser(session?.user?.id));

  const {
    data: userTickers,
    refetch,
    isLoading,
    isError,
    error,
  }: any = useQuery(['userTickers'], () => getUserTickers(session.user.id));

  useEffect(() => {
    if (userTickers !== undefined) {
      const getData = async (userTickers: any) => {
        return await Promise.all(
          userTickers.map(async (ticker: any) => {
            try {
              const responseCompany = await fetch(
                `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker.tickers}&token=${apiKey}`
              );
              const responsePrice = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${ticker.tickers}&token=${apiKey}`
              );
              const jsonCompany = await responseCompany.json();
              const jsonPrice = await responsePrice.json();

              if (jsonPrice && jsonCompany) {
                // console.log(jsonPrice);
                // console.log(jsonCompany);
                setCompany((current: any) => [
                  ...current,
                  { company: jsonCompany, price: jsonPrice },
                ]);
              }

              return {};
            } catch (error) {
              return error;
            }
          })
        );
      };

      getData(userTickers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTickers]);

  useEffect(() => {
    if (company !== undefined) {
      let newArray = company.filter(
        (value: any) => Object.keys(value).length !== 0
      );

      if (newArray.length !== 0) {
        let largestObject = newArray.reduce((prev: any, curr: any) =>
          prev?.price?.dp > curr?.price?.dp ? prev : curr
        );

        let smallestObject = newArray.reduce((prev: any, curr: any) =>
          prev?.price?.dp < curr?.price?.dp ? prev : curr
        );

        setWinner(largestObject);
        setLoser(smallestObject);
      }
    }
  }, [company]);

  if (isLoading) return <LoaderSpinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <div className="mx-4 md:mx-10">
        <div className="flex flex-col md:max-w-[1024px] gap-10 mt-4 mb-36 mx-auto">
          <div className="mx-4 text-sm text-gray-600 mt-5 md:mt-0">
            <Link
              href="/dashboard"
              className="dark:hover:text-white hover:text-black"
            >
              dashboard
            </Link>
          </div>
          <Profile
            user={user?.data}
            winner={winner}
            loser={loser}
            tickers={userTickers}
          />
          <div className="md:hidden">
            <WinnersLosers winner={winner} loser={loser} />
          </div>
          <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-10 py-6 dark:bg-dark max-w-[500px] mx-auto md:max-w-[768px] md:mx-auto dark:shadow-dark3xl">
            <p className="text-sm">
              This app consumes Finnhub&apos;s Stock API. It&apos;s currently
              using the free tier which only allows 60 queries per minute. If
              you see any errors it is because you or someone else has used up
              the allotted 60 queries and will need to wait 1 minute for the
              cooldown to refresh. Each card represents 1 query since the free
              tier does not offer an API endpoint that allows for multiple stock
              symbols as a parameter. So each render is pretty expensive.
            </p>
          </div>
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
