import { BiErrorCircle } from 'react-icons/bi';

export const SearchErrorModal = ({ closeErrorModal }: any) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-gray-300 bg-opacity-80 flex justify-center pt-40 dark:bg-gray-800 dark:bg-opacity-80">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-12 px-5 md:px-10 bg-white shadow-md rounded-md shadow-gray-500 flex flex-col gap-4 items-center dark:bg-black dark:shadow-black">
            <div className="flex justify-center">
              <BiErrorCircle className="text-5xl text-red-500 dark:text-red-600" />
            </div>
            <h1 className="text-lg font-bold">No such ticker exists</h1>
            <p className="text-sm w-5/6 mb-4">
              Make sure your inputted ticker exists. Also, the free tier API
              endpoint is limited in scope so no generic terms are allowed, only
              a single ticker can be searched each time.
            </p>
            <button
              onClick={closeErrorModal}
              className="bg-blue-600 text-white w-full rounded-md py-2 text hover:bg-black dark:hover:bg-white dark:hover:text-black"
            >
              Go back to search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
