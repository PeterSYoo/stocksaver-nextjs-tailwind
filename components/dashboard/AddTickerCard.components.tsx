import Link from 'next/link';

export const AddTickerCard = () => {
  return (
    <>
      <Link href="/search">
        <div className="bg-gray-200 flex flex-col justify-center items-center w-60 h-12 rounded-3xl shadow-md shadow-gray-500 dark:bg-black dark:text-white dark:hover:text-white text-black hover:bg-blue-700 duration-300 ease-in-out hover:text-white dark:hover:bg-blue-700 dark:shadow-dark3xl md:h-32 md:w-32 md:hover:h-40 md:hover:w-40 hover:w-72">
          <h1 className="text-3xl font-bold">+</h1>
        </div>
      </Link>
    </>
  );
};
