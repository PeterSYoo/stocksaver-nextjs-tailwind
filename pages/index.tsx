import { useEffect, useState } from 'react';
import { Header } from '../components/Header.components';
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
          <Header />
          <Signup />
        </>
      ) : null}
    </>
  );
};

export default Home;
