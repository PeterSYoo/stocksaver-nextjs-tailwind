import Link from 'next/link';

export const AddTickerCard = () => {
  return (
    <>
      <Link href="/search">
        <div className="bg-gray-200 rounded-3xl shadow-md shadow-gray-500 dark:bg-black dark:shadow-dark3xl flex flex-col gap-10 md:gap-0 md:h-80 justify-between w-72 h-12 md:w-64 hover:bg-blue-600 dark:hover:bg-gray-200 dark:hover:text-black hover:text-white">
          <div className="flex flex-col justify-center items-center h-full text-3xl">
            +
          </div>
        </div>
      </Link>
    </>
  );
};
