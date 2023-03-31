import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { Login } from '../../components/Login.components';
import { Signup } from '../../components/Signup.components';

const RegisterPage = () => {
  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <Signup />
    </>
  );
};

export default RegisterPage;

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
