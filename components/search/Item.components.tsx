import { IoIosAddCircleOutline } from 'react-icons/io';

export const Item = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-start-1 col-span-6">
          <div className="flex flex-col md:flex-row md:items-center md:gap-20">
            <span className="text-xl font-bold">AAPL</span>
            <span className="text-xs md:text-lg">Apple Inc</span>
          </div>
        </div>
        <div className="col-start-7 col-span-3">
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-36">
            <span className="text-xl font-bold">$145</span>
            <span className="text-xs md:text-lg">+0.456</span>
          </div>
        </div>
        <div className="col-start-10 col-span-3 flex justify-end">
          <div className="flex items-center">
            <button className="dark:text-gray-600 dark:hover:text-white text-gray-500 hover:text-black">
              <IoIosAddCircleOutline className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="border-b border-gray-300 dark:border-gray-700 col-span-12"></div>
      </div>
    </>
  );
};
