import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { Login } from '../../components/Login.components';
import { authOptions } from '../api/auth/[...nextauth]';

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;

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
    props: {},
  };
};
