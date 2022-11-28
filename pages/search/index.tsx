import Link from 'next/link';
import { SearchInput } from '../../components/search/SearchInput.components';
import { SearchList } from '../../components/search/SearchList.components';

const SearchPage = () => {
  return (
    <>
      <div className="mx-4 md:mx-10">
        <div className="flex flex-col md:max-w-[1024px] gap-6 mt-4 mb-36 mx-auto">
          <div className="mx-4 text-sm text-gray-600">
            <Link href="/dashboard" className="hover:text-white">
              dashboard
            </Link>{' '}
            &#62;{' '}
            <Link href="/search" className="hover:text-white">
              search
            </Link>
          </div>
          <SearchInput />
          <SearchList />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
