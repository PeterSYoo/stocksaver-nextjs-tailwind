import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Signup } from '../components/Signup.components';

const Home = () => {
  const [hydrated, setHydrated] = useState(false);

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

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

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
      session,
    },
  };
};
