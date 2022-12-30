import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../lib/usersHelper';
import { Profile } from '../../components/dashboard/Profile.components';
import { TickerCards } from '../../components/dashboard/TickerCards.components';
import { WinnersLosers } from '../../components/dashboard/WinnersLosers.components';
import { LoaderSpinner } from '../../components/LoaderSpinner.components';
import { getUserTickers } from '../../lib/userTickersHelper';

type Ticker = {
  _id: string;
  user: string;
  tickers: string;
  __v: number;
};

type Price = {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
};

type Information = {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
};

type Company = {
  company: Information;
  price: Price;
};

type User = {
  email: string;
  image: string;
  id: string;
};

type Session = {
  user: User;
  expires: string;
};

type DashboardPageProps = {
  session: Session;
};

type UserTickersResponse = {
  data: any;
  refetch: () => void;
  isLoading: boolean;
  isError: boolean;
  error?: any;
};

const DashboardPage = ({ session }: DashboardPageProps) => {
  const [apiKey] = useState(process.env.NEXT_PUBLIC_API_KEY);
  const [company, setCompany] = useState<Company[]>([]);
  const [winner, setWinner] = useState<any>();
  const [loser, setLoser] = useState<any>();
  const [localTickers, setLocalTickers] = useState<any>();
  const [deletedTicker, setDeletedTicker] = useState<string>('');

  const user = useQuery(['user'], () => getUser(session?.user?.id));

  const {
    data: userTickers,
    refetch,
    isLoading,
    isError,
    error,
  }: UserTickersResponse = useQuery(['userTickers'], () =>
    getUserTickers(session.user.id)
  );

  console.log(userTickers);

  useEffect(() => {
    setLocalTickers(userTickers);
  }, [userTickers]);

  useEffect(() => {
    if (userTickers !== undefined) {
      const getData = async (userTickers: Ticker[]) => {
        return await Promise.all(
          userTickers.map(async (ticker: Ticker) => {
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
                setCompany((current: Company[]) => [
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
  }, [userTickers, userTickers?._id]);

  useEffect(() => {
    if (company !== undefined) {
      let newArray = company.filter(
        (value: Company) => Object.keys(value).length !== 0
      );

      if (newArray.length !== 0) {
        let largestObject = newArray.reduce((prev: Company, curr: Company) =>
          prev?.price?.dp > curr?.price?.dp ? prev : curr
        );

        let smallestObject = newArray.reduce((prev: Company, curr: Company) =>
          prev?.price?.dp < curr?.price?.dp ? prev : curr
        );

        setWinner(largestObject);
        setLoser(smallestObject);
      }
    }

    if (deletedTicker !== '') {
      let temp = company;
      let tempList = [];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i]?.company?.ticker !== deletedTicker) {
          tempList.push(temp[i]);
        }
      }
      setCompany(tempList);
      setDeletedTicker('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              symbols as a parameter. So each render is pretty expensive. If
              only a single card is not rendering, that means the API has
              blocked that data from being available to us through the free
              tier.
            </p>
          </div>
          <TickerCards
            tickers={userTickers}
            refetch={refetch}
            localTickers={localTickers}
            setDeletedTicker={setDeletedTicker}
            setWinner={setWinner}
            setLoser={setLoser}
          />
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
