import { FaUser } from 'react-icons/fa';

export const LoginUsernameErrorModal = ({ closeUsernameErrorModal }: any) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-gray-300 bg-opacity-80 flex justify-center pt-40 dark:bg-gray-800 dark:bg-opacity-80">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-12 px-5 md:px-10 bg-white shadow-md rounded-md shadow-gray-500 flex flex-col gap-6 items-center dark:bg-black dark:shadow-black">
            <div className="flex justify-center">
              <FaUser className="text-5xl text-red-500 dark:text-red-600" />
            </div>
            <h1 className="text-lg font-bold mb-3">
              Username doesn&apos;t exist!
            </h1>
            <button
              onClick={closeUsernameErrorModal}
              className="bg-blue-600 text-white w-full rounded-md py-2 text hover:bg-black dark:hover:bg-white dark:hover:text-black"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
