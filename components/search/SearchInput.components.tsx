import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import * as Yup from 'yup';
import { addSearch } from '../../lib/searchHelper';
import { LoaderSpinnerSearch } from '../LoaderSpinnerSearch.components';
import { SearchErrorModal } from './SearchErrorModal.components';
import { SearchResults } from './SearchResults.components';
import { SearchSuccessModal } from './SearchSuccessModal.components';
import { FiX } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchSchema = Yup.object().shape({
  search: Yup.string()
    .trim('The searched ticker cannot include leading and trailing spaces')
    .max(25, 'too long!')
    .matches(
      /^[0-9a-zA-Z.]+$/,
      'no trailing commas, no special characters, and no white spaces allowed.'
    ),
});

export const SearchInput = () => {
  const [apiKey] = useState(`${process.env.NEXT_PUBLIC_API_KEY}`);
  const [resultPrice, setResultPrice] = useState<any>({});
  const [resultCompany, setResultCompany] = useState<any>({});
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>();

  const { data: sessionState }: any = useSession();

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const symbol = formik.values.search.toUpperCase();
      const responseCompany = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`
      );
      const responsePrice = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
      );
      const jsonCompany = await responseCompany.json();
      const jsonPrice = await responsePrice.json();

      if (Object.keys(jsonCompany).length !== 0) {
        setResultCompany(jsonCompany);
        setResultPrice(jsonPrice);
      } else {
        setIsErrorModalOpen(true);
      }

      return {};
    } catch (error) {
      return error;
    }
  };

  const handleAdd = async () => {
    await addMutateAsync({
      tickers: resultCompany.ticker,
      user: sessionState?.user?.id,
    });
    setResultCompany({});
    // router.push('/dashboard');
    setIsSuccessModalOpen(true);
  };

  const { mutateAsync, isLoading } = useMutation(handleSubmit);

  const { mutateAsync: addMutateAsync, isLoading: addIsLoading } =
    useMutation(addSearch);

  const onSubmit = async () => {
    await mutateAsync();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: SearchSchema,
    onSubmit,
  });

  return (
    <>
      {isErrorModalOpen || isSuccessModalOpen ? (
        <>
          {isErrorModalOpen && (
            <SearchErrorModal closeErrorModal={closeErrorModal} />
          )}
          {isSuccessModalOpen && (
            <SearchSuccessModal closeSuccessModal={closeSuccessModal} />
          )}
        </>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 dark:bg-dark max-w-[500px] mx-auto md:max-w-[768px] md:mx-auto dark:shadow-dark3xl">
          <h1 className="text-center font-bold text-2xl mb-1">
            Search Tickers
          </h1>
          <p className="text-xs text-center mb-6">
            Example search&#58;&nbsp;&nbsp;&#34;AAPL&#34;
          </p>
          <div className="grid grid-cols-12 h-full md:mx-5">
            <div
              className={
                formik.errors.search
                  ? 'border border-red-400 text-red-400 hover:border-red-600 hover:text-red-600 flex items-center pl-2 rounded-l-full py-2 dark:border-red-600 dark:text-red-500 dark:hover:border-red-600 dark:hover:text-red-600 col-start-1 md:col-span-10 col-span-9'
                  : 'border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-l-full py-2 dark:border-gray-500 dark:text-gray-700 dark:hover:border-gray-400 dark:hover:text-white col-start-1 md:col-span-10 col-span-9'
              }
            >
              {formik.values.search ? (
                <AiOutlineSearch
                  className={
                    formik.errors.search
                      ? 'text-2xl text-red-600 dark:text-red-500 ml-2'
                      : 'text-2xl text-gray-600 dark:text-gray-400 ml-2'
                  }
                />
              ) : null}
              <input
                type="text"
                placeholder="search tickers..."
                className={
                  formik.errors.search
                    ? 'w-full px-2 focus:outline-none text-red-600 dark:text-red-500 dark:bg-dark placeholder:text-red-400 dark:placeholder:text-red-500 dark:placeholder:text-opacity-30 placeholder:text-opacity-50'
                    : 'w-full px-2 focus:outline-none text-black dark:bg-dark dark:text-white dark:placeholder:text-gray-600 placeholder:text-gray-300'
                }
                {...formik.getFieldProps('search')}
                name="search"
              />
              {formik.values.search ? (
                <span
                  onClick={() => formik.resetForm()}
                  className="cursor-pointer mr-2"
                >
                  <FiX
                    className={
                      formik.errors.search
                        ? 'text-2xl text-red-400 hover:text-red-500 dark:text-red-500 dark:hover:text-red-600'
                        : 'text-2xl text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
                    }
                  />
                </span>
              ) : null}
            </div>
            <div className="col-start-10 md:col-start-11 md:col-span-2 col-span-3 border border-gray-400 rounded-r-full border-l-0 dark:border-gray-500 flex justify-center">
              {formik.errors.search ? (
                <button
                  disabled={true}
                  className="flex items-center h-full text-gray-400 dark:text-gray-700 opacity-25"
                >
                  <AiOutlineSearch className="text-2xl" />
                </button>
              ) : (
                <button
                  disabled={isLoading || !formik.values.search ? true : false}
                  className={
                    !formik.values.search
                      ? 'flex items-center h-full text-gray-400 dark:text-gray-500 opacity-25'
                      : 'flex items-center h-full text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
                  }
                >
                  {isLoading ? (
                    <LoaderSpinnerSearch />
                  ) : (
                    <AiOutlineSearch className="text-2xl" />
                  )}
                </button>
              )}
            </div>
          </div>
          {formik.errors.search ? (
            <div className="w-3/4 ml-11 md:ml-12">
              <span className="text-[10px] text-red-500 md:text-[12px]">
                {formik.errors.search}
              </span>
            </div>
          ) : null}
        </div>
      </form>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-10 py-6 dark:bg-dark max-w-[500px] mx-auto md:max-w-[650px] md:mx-auto dark:shadow-dark3xl">
        <p className="text-sm">
          This app consumes Finnhub&apos;s Stock API. It&apos;s currently using
          the free tier, and since it&apos;s on the free tier the search api
          endpoint is limited in scope in what you are allowed to search.
          That&apos;s why you are only able to make searches for a specific
          ticker symbol and not for multiple symbols or generic names.
        </p>
      </div>
      <SearchResults
        resultCompany={resultCompany}
        resultPrice={resultPrice}
        handleAdd={handleAdd}
        isLoading={addIsLoading}
      />
    </>
  );
};
