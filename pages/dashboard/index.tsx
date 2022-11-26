import { getSession } from 'next-auth/react';

const DashboardPage = ({ session }: any) => {
  return (
    <>
      <div className="">{session ? <>Logged in</> : <>Not logged in</>}</div>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps = async (context: any) => {
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
