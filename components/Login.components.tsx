import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { HiFingerPrint } from 'react-icons/hi';
import { useTheme } from 'next-themes';
import { LoaderSpinner2 } from './LoaderSpinner2.components';

interface Values {
  email: String;
  password: String;
}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .max(50, 'too long!')
    .required('please enter your username')
    .matches(/^[0-9a-zA-Z]+$/, 'only letters and numbers allowed, no spaces.'),
  password: Yup.string()
    .required('please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'password must contain at least 8 characters, 1 uppercase, 1 number and 1 special case character'
    ),
});

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const router = useRouter();

  const handleSubmit = async () => {
    const status: any = await signIn('credentials', {
      redirect: false,
      username: formik.values.username,
      password: formik.values.password,
      callbackUrl: '/dashboard',
    });

    if (status.error) alert(status.error);
    if (status.ok) router.push(status.url);
  };

  const { mutateAsync, isLoading } = useMutation(handleSubmit);

  const onSubmit = async (values: any) => {
    await mutateAsync(values);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="md:mx-10 mt-12 mb-24">
          <div className="max-w-[327px] md:max-w-[937px] animate-border rounded-3xl from-purple-500 via-teal-500 to-blue-500 bg-[length:400%_400%] p-0.5 dark:bg-black dark:bg-gradient-to-r mx-auto">
            <div className="bg-white pt-4 md:pt-0 rounded-3xl shadow-md shadow-gray-500 md:grid md:grid-cols-2 dark:shadow-none dark:bg-dark">
              <div className="mt-4 md:mt-10">
                <h1 className="text-2xl font-bold text-center md:text-3xl">
                  Login
                </h1>
                <div className="px-10">
                  <label>
                    <h3
                      className={
                        formik.errors.username
                          ? 'text-red-600 dark:text-red-500 mt-5'
                          : 'mt-5'
                      }
                    >
                      Username:
                    </h3>
                    <div
                      className={
                        formik.errors.username
                          ? 'border border-red-400 text-red-400 hover:border-red-600 hover:text-red-600 flex items-center pl-2 rounded-md py-2 dark:border-red-600 dark:text-red-500 dark:hover:border-red-600 dark:hover:text-red-600'
                          : 'border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-gray-500 dark:hover:text-white'
                      }
                    >
                      <MdAlternateEmail />
                      <input
                        type="text"
                        placeholder="username"
                        className={
                          formik.errors.username
                            ? 'w-full px-2 focus:outline-none text-red-600 dark:text-red-500 dark:bg-dark placeholder:text-red-400 dark:placeholder:text-red-500 dark:placeholder:text-opacity-30 placeholder:text-opacity-50'
                            : 'w-full px-2 focus:outline-none text-black dark:bg-dark dark:text-white dark:placeholder:text-gray-700'
                        }
                        {...formik.getFieldProps('username')}
                        name="username"
                      />
                    </div>
                    <div className="text-center">
                      {formik.errors.username ? (
                        <span className="text-[10px] text-red-500 md:text-[12px]">
                          {formik.errors.username}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </label>
                  <label>
                    <h3
                      className={
                        formik.errors.password
                          ? 'text-red-600 dark:text-red-500 mt-2'
                          : 'mt-2'
                      }
                    >
                      Password:
                    </h3>
                    <div className="grid grid-cols-12 h-full">
                      <div
                        className={
                          formik.errors.password
                            ? 'border border-red-400 text-red-400 hover:border-red-600 hover:text-red-600 flex items-center pl-2 rounded-l-md py-2 dark:border-red-600 dark:text-red-500 dark:hover:border-red-600 dark:hover:text-red-600 col-start-1 md:col-span-10 col-span-9'
                            : 'border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-l-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-gray-500 dark:hover:text-white col-start-1 md:col-span-10 col-span-9'
                        }
                      >
                        <RiLockPasswordLine />
                        <input
                          type={`${showPassword ? 'text' : 'password'}`}
                          placeholder="••••••••••"
                          className={
                            formik.errors.password
                              ? 'w-full px-2 focus:outline-none text-red-600 dark:text-red-500 dark:bg-dark placeholder:text-red-400 dark:placeholder:text-red-500 dark:placeholder:text-opacity-30 placeholder:text-opacity-50'
                              : 'w-full px-2 focus:outline-none text-black dark:bg-dark dark:text-white dark:placeholder:text-gray-700'
                          }
                          {...formik.getFieldProps('password')}
                          name="password"
                        />
                      </div>
                      <div className="col-start-10 md:col-start-11 md:col-span-2 col-span-3 border border-gray-400 rounded-r-md border-l-0 dark:border-gray-700">
                        <span
                          className="icon flex items-center justify-center h-full px-4 cursor-pointer text-gray-400 hover:text-black dark:text-gray-700 dark:hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <HiFingerPrint />
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      {formik.errors.password ? (
                        <span className="text-[10px] text-red-500 md:text-[12px]">
                          {formik.errors.password}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </label>
                  {formik.errors.username || formik.errors.password ? (
                    <span className="bg-gray-400 dark:bg-gray-700 w-full mt-10 text-gray-200 dark:text-gray-500 font-bold text-xl py-2 rounded-3xl flex justify-center cursor-default">
                      Login
                    </span>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading ? true : false}
                      className={
                        isLoading
                          ? 'bg-white dark:bg-dark w-full mt-10 text-gray-200 dark:text-gray-500 font-bold text-xl py-2 rounded-3xl flex justify-center cursor-default'
                          : 'bg-blue-600 w-full mt-10 text-white font-bold text-xl py-2 rounded-3xl dark:hover:bg-white dark:hover:text-[#0f1117] hover:bg-black'
                      }
                    >
                      {isLoading ? <LoaderSpinner2 /> : <>Login</>}
                    </button>
                  )}
                  <p className="text-xs text-center mt-3 dark:text-gray-500 text-gray-500">
                    Don&#39;t have an account?{' '}
                    <Link
                      href="/"
                      className="text-black hover:text-gray-300 dark:text-white dark:hover:text-gray-800"
                    >
                      Register here
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="">
                <Image
                  src="https://i.imgur.com/KqMSQKH.png"
                  width={466}
                  height={686}
                  alt="hero desktop"
                  className="hidden md:block"
                />
              </div>
              <Image
                src="https://i.imgur.com/DKKQpJd.png"
                width={327}
                height={135}
                alt="hero mobile"
                className="mt-10 md:hidden"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
