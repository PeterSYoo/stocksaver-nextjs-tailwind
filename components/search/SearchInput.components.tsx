import { AiOutlineSearch } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';

export const SearchInput = () => {
  return (
    <>
      <form>
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 dark:shadow-none dark:bg-dark max-w-[500px] mx-auto md:max-w-[768px] md:mx-auto">
          <div className="grid grid-cols-12 h-full">
            <div className="col-start-1 md:col-span-11 col-span-10 border border-gray-500 rounded-l-full py-2 pl-4 pr-3 border-r-0 dark:border-gray-600 flex items-center">
              <input
                type="text"
                placeholder="search"
                className="w-full focus:outline-none dark:bg-dark"
              />
              <span className="cursor-pointer">
                <FiX className="text-2xl text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white" />
              </span>
            </div>
            <div className="col-start-11 md:col-start-12 md:col-span-1 col-span-2 bg-gray-300 flex h-full rounded-r-full border border-gray-500 items-center justify-center dark:border-gray-600 dark:bg-gray-700">
              <button>
                <AiOutlineSearch className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
