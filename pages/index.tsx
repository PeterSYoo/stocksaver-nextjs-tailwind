import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Signup } from '../components/Signup.components';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const Home = ({ session }: any) => {
  const [hydrated, setHydrated] = useState(false);

  console.log(session);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      {hydrated ? (
        <>
          <Signup />
        </>
      ) : null}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};
