import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { Header } from '../../components/header/Header.components';
import { authOptions } from '../api/auth/[...nextauth]';

const HeaderPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Header session={session} />
    </>
  );
};

export default HeaderPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  return {
    props: {
      session,
    },
  };
};
