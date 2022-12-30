import { useRouter } from 'next/router';
import { BsFillCheckCircleFill } from 'react-icons/bs';

type SearchSuccessModalProps = {
  closeSuccessModal: () => void;
};

export const SearchSuccessModal = ({
  closeSuccessModal,
}: SearchSuccessModalProps) => {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-gray-300 bg-opacity-80 flex justify-center pt-40 dark:bg-gray-800 dark:bg-opacity-80">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-12 px-5 md:px-10 bg-white shadow-md rounded-md shadow-gray-500 flex flex-col gap-5 items-center dark:bg-black dark:shadow-black">
            <div className="flex justify-center">
              <BsFillCheckCircleFill className="text-5xl text-green-600 dark:text-green-500" />
            </div>
            <h1 className="text-lg font-bold mt-3">
              Ticker added to your dashboard!
            </h1>
            <p className="text-sm w-5/6"></p>
            <div className="flex justify-between gap-5 w-full">
              <button
                onClick={closeSuccessModal}
                className="border border-gray-700 rounded-md w-full hover:bg-black hover:text-white hover:border-none dark:hover:bg-white dark:hover:text-black"
              >
                Back to search
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-blue-600 text-white w-full rounded-md py-2 text hover:bg-black dark:hover:bg-white dark:hover:text-black"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
