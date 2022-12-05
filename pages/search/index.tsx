import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { SearchInput } from '../../components/search/SearchInput.components';
import { authOptions } from '../api/auth/[...nextauth]';

const SearchPage = () => {
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
            &nbsp;&nbsp;
            <span className="text-[11px]">&#62;</span>&nbsp;&nbsp;
            <Link
              href="/search"
              className="dark:hover:text-white hover:text-black"
            >
              search
            </Link>
          </div>
          <SearchInput />
        </div>
      </div>
    </>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
};
