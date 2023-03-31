import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Signup } from '../components/Signup.components';
import { Login } from '../components/Login.components';

const Home = () => {
  // States ------------------------------------------------------------- ***
  const [hydrated, setHydrated] = useState(false);

  // Effects ------------------------------------------------------------- ***
  useEffect(() => {
    setHydrated(true);
  }, []);

  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      {hydrated ? (
        <>
          <Login />
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
