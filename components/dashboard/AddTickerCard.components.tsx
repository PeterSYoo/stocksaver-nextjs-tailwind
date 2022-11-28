import Link from 'next/link';

export const AddTickerCard = () => {
  return (
    <>
      <Link href="/search">
        <div className="bg-[#F1F6FA] flex flex-col justify-center items-center h-36 rounded-3xl shadow-md shadow-gray-500 dark:shadow-none dark:bg-black dark:text-gray-800 dark:hover:text-white text-gray-500 hover:text-black">
          <h1 className="text-3xl font-bold">+</h1>
        </div>
      </Link>
    </>
  );
};
