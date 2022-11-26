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

interface Values {
  email: String;
  password: String;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .max(50, 'too long!')
    .email()
    .required('please enter your email'),
  password: Yup.string()
    .required('please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'password must contain at least 8 characters, 1 uppercase, 1 number and 1 special case character'
    ),
});

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const status: any = await signIn('credentials', {
      redirect: false,
      email: formik.values.email,
      password: formik.values.password,
      callbackUrl: '/dashboard',
    });

    if (status.ok) router.push(status.url);
  };

  const { mutateAsync, isLoading } = useMutation(handleSubmit);

  const onSubmit = async (values: any) => {
    await mutateAsync(values);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="md:mx-10">
          <div className="max-w-[327px] md:max-w-[937px] animate-border rounded-3xl from-purple-500 via-teal-500 to-blue-500 bg-[length:400%_400%] p-0.5 dark:bg-black dark:bg-gradient-to-r mx-auto">
            <div className="bg-white pt-4 md:pt-0 rounded-3xl shadow-md shadow-gray-500 md:grid md:grid-cols-2 dark:shadow-none dark:bg-[#0f121a]">
              <div className="mt-4 md:mt-10">
                <h1 className="text-2xl font-bold text-center md:text-3xl">
                  Login
                </h1>
                <div className="px-10">
                  <label>
                    <h3
                      className={
                        formik.errors.email
                          ? 'text-red-600 dark:text-red-500 mt-5'
                          : 'mt-5'
                      }
                    >
                      Email:
                    </h3>
                    <div
                      className={
                        formik.errors.email
                          ? 'border border-red-400 text-red-400 hover:border-red-600 hover:text-red-600 flex items-center pl-2 rounded-md py-2 dark:border-red-600 dark:text-red-500 dark:hover:border-red-600 dark:hover:text-red-600'
                          : 'border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-white dark:hover:text-white'
                      }
                    >
                      <MdAlternateEmail />
                      <input
                        type="email"
                        placeholder="user@email.com"
                        className={
                          formik.errors.email
                            ? 'w-full px-2 focus:outline-none text-red-600 dark:text-red-500 dark:bg-[#0f121a] placeholder:text-red-400 dark:placeholder:text-red-500 dark:placeholder:text-opacity-30 placeholder:text-opacity-50'
                            : 'w-full px-2 focus:outline-none text-black dark:bg-[#0f121a] dark:text-white dark:placeholder:text-gray-700'
                        }
                        {...formik.getFieldProps('email')}
                        name="email"
                      />
                    </div>
                    <div className="text-center">
                      {formik.errors.email ? (
                        <span className="text-[10px] text-red-500 md:text-[12px]">
                          &#39;{formik.errors.email}&#39;
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
                    <div
                      className={
                        formik.errors.password
                          ? 'border border-red-400 text-red-400 hover:border-red-600 hover:text-red-600 flex items-center pl-2 rounded-md py-2 dark:border-red-600 dark:text-red-500 dark:hover:border-red-600 dark:hover:text-red-600'
                          : 'border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-white dark:hover:text-white'
                      }
                    >
                      <RiLockPasswordLine />
                      <input
                        type={`${showPassword ? 'text' : 'password'}`}
                        placeholder="••••••••••"
                        className={
                          formik.errors.password
                            ? 'w-full px-2 focus:outline-none text-red-600 dark:text-red-500 dark:bg-[#0f121a] placeholder:text-red-400 dark:placeholder:text-red-500 dark:placeholder:text-opacity-30 placeholder:text-opacity-50'
                            : 'w-full px-2 focus:outline-none text-black dark:bg-[#0f121a] dark:text-white dark:placeholder:text-gray-700'
                        }
                        {...formik.getFieldProps('password')}
                        name="password"
                      />
                      <span
                        className="icon flex items-center px-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <HiFingerPrint />
                      </span>
                    </div>
                    <div className="text-center">
                      {formik.errors.password ? (
                        <span className="text-[10px] text-red-500 md:text-[12px]">
                          &#39;{formik.errors.password}&#39;
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </label>
                  {formik.errors.email || formik.errors.password ? (
                    <span className="bg-gray-400 dark:bg-gray-700 w-full mt-10 text-gray-200 dark:text-gray-500 font-bold text-xl py-2 rounded-3xl flex justify-center cursor-default">
                      Login
                    </span>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading ? true : false}
                      className="bg-blue-600 w-full mt-10 text-white font-bold text-xl py-2 rounded-3xl dark:hover:bg-white dark:hover:text-[#0f121a] hover:bg-black"
                    >
                      {isLoading ? <>Loading..</> : <>Login</>}
                    </button>
                  )}
                  <p className="text-xs text-center mt-3 dark:text-gray-500 text-gray-500">
                    Don&#39;t have an account?{' '}
                    <Link
                      href="/"
                      className="text-black hover:text-gray-300 dark:text-white dark:hover:text-gray-800"
                    >
                      Register
                    </Link>{' '}
                    here.
                  </p>
                </div>
              </div>
              <div className="">
                <Image
                  src="https://i.imgur.com/46Ec3gL.png"
                  width={466}
                  height={686}
                  alt="hero desktop"
                  className="hidden md:block"
                />
              </div>
              <Image
                src="https://i.imgur.com/LDfAqQA.png"
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
