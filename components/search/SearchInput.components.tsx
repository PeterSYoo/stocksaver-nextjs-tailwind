import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';
import * as Yup from 'yup';
import { LoaderSpinnerSearch } from '../LoaderSpinnerSearch.components';
import { SearchResults } from './SearchResults.components';

interface Values {
  search: any;
}

const SearchSchema = Yup.object().shape({
  search: Yup.string()
    .trim('The searched ticker cannot include leading and trailing spaces')
    .max(25, 'too long!')
    .matches(
      /^[0-9a-zA-Z]*,*[0-9a-zA-Z]*,*[0-9a-zA-Z]+$/,
      'max 3 tickers, no trailing commas, no special characters, and no white spaces allowed.'
    ),
});

export const SearchInput = () => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState({});
  const [apiKey] = useState(`${process.env.NEXT_PUBLIC_API_KEY}`);

  const handleSubmit = async () => {
    try {
      const symbols = formik.values.search;
      const response = await fetch(
        `https://api.stockdata.org/v1/data/quote?symbols=${symbols}&api_token=${apiKey}`
      );
      const json = await response.json();

      if (json) {
        console.log(json);
        setResult(json.data);
        setError(json.meta);
      }

      return {};
    } catch (error) {
      return error;
    }
  };

  const { mutateAsync, isLoading } = useMutation(handleSubmit);

  const onSubmit = async (values: Values) => {
    console.log(values.search);
    await mutateAsync(values.search);
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
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-5 py-6 dark:shadow-none dark:bg-dark max-w-[500px] mx-auto md:max-w-[768px] md:mx-auto">
          <h1 className="text-center font-bold text-2xl mb-1">
            Search Tickers
          </h1>
          <p className="text-xs text-center mb-1">
            Example search&#58;&nbsp;&nbsp;&#34;AAPL&#44;MSFT&#44;GOOGL&#34;
          </p>
          <p className="text-xs text-center mb-4">
            Max # of tickers per search&#58;&nbsp;3
          </p>
          <div className="grid grid-cols-12 h-full">
            <div
              className={
                formik.errors.search
                  ? 'border border-red-400 text-red-400 hover:border-red-600 hover:text-red-600 flex items-center pl-2 rounded-l-full py-2 dark:border-red-600 dark:text-red-500 dark:hover:border-red-600 dark:hover:text-red-600 col-start-1 md:col-span-10 col-span-9'
                  : 'border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-l-full py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-gray-500 dark:hover:text-white col-start-1 md:col-span-10 col-span-9'
              }
            >
              {formik.values.search ? (
                <AiOutlineSearch
                  className={
                    formik.errors.search
                      ? 'text-2xl text-red-600 dark:text-red-500'
                      : 'text-2xl text-gray-600 dark:text-gray-400'
                  }
                />
              ) : null}
              <input
                type="text"
                placeholder="search tickers..."
                className={
                  formik.errors.search
                    ? 'w-full px-2 focus:outline-none text-red-600 dark:text-red-500 dark:bg-dark placeholder:text-red-400 dark:placeholder:text-red-500 dark:placeholder:text-opacity-30 placeholder:text-opacity-50'
                    : 'w-full px-2 focus:outline-none text-black dark:bg-dark dark:text-white dark:placeholder:text-gray-700 placeholder:text-gray-300'
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
            <div className="col-start-10 md:col-start-11 md:col-span-2 col-span-3 border border-gray-400 rounded-r-full border-l-0 dark:border-gray-700 flex justify-center">
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
            <span className="text-[10px] text-red-500 md:text-[12px]">
              {formik.errors.search}
            </span>
          ) : null}
        </div>
      </form>
      <SearchResults results={result} error={error} />
    </>
  );
};
