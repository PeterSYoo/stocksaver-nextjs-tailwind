import Link from 'next/link';
import { SearchInput } from '../../components/search/SearchInput.components';
import { SearchList } from '../../components/search/SearchList.components';

const SearchPage = () => {
  return (
    <>
      <div className="mx-4 md:mx-10">
        <div className="flex flex-col md:max-w-[1024px] gap-6 mt-4 mb-36 mx-auto">
          <div className="mx-4 text-sm text-gray-600">
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
          <SearchList />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
