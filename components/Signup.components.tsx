import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiUser } from 'react-icons/bi';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import * as Yup from 'yup';

interface Values {
  username: String;
  email: String;
  password: String;
  cpassword: String;
}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'too short!')
    .max(18, 'too long!')
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\d+$\s]*)$/gi,
      'name can only contain latin letters and numbers.'
    )
    .required('please enter a username'),
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
  cpassword: Yup.string()
    .required('please confirm your password')
    .oneOf([Yup.ref('password'), null], "passwords don't match."),
});

export const Signup = () => {
  const router = useRouter();

  const onSubmit = async (values: Values) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push(process.env.NEXT_PUBLIC_APP_URL!);
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
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
                  Sign-Up!
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
                          : 'border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-white dark:hover:text-white'
                      }
                    >
                      <BiUser />
                      <input
                        type="text"
                        placeholder="username"
                        className={
                          formik.errors.username
                            ? 'w-full px-2 focus:outline-none text-red-600 dark:text-red-500 dark:bg-[#0f121a] placeholder:text-red-400 dark:placeholder:text-red-500 dark:placeholder:text-opacity-30 placeholder:text-opacity-50'
                            : 'w-full px-2 focus:outline-none text-black dark:bg-[#0f121a] dark:text-white dark:placeholder:text-gray-700'
                        }
                        {...formik.getFieldProps('username')}
                        name="username"
                      />
                    </div>
                    <div className="text-center">
                      {formik.errors.username ? (
                        <span className="text-[10px] text-red-500 md:text-[12px]">
                          &#39;{formik.errors.username}&#39;
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </label>
                  <label>
                    <h3
                      className={
                        formik.errors.email
                          ? 'text-red-600 dark:text-red-500 mt-2'
                          : 'mt-2'
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
                        type="password"
                        placeholder="********"
                        className={
                          formik.errors.password
                            ? 'w-full px-2 focus:outline-none text-red-600 dark:text-red-500 dark:bg-[#0f121a] placeholder:text-red-400 dark:placeholder:text-red-500 dark:placeholder:text-opacity-30 placeholder:text-opacity-50'
                            : 'w-full px-2 focus:outline-none text-black dark:bg-[#0f121a] dark:text-white dark:placeholder:text-gray-700'
                        }
                        {...formik.getFieldProps('password')}
                        name="password"
                      />
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
                  <label>
                    <h3
                      className={
                        formik.errors.cpassword
                          ? 'text-red-600 dark:text-red-500 mt-2'
                          : 'mt-2'
                      }
                    >
                      Confirm Password:
                    </h3>
                    <div
                      className={
                        formik.errors.cpassword
                          ? 'border border-red-400 text-red-400 hover:border-red-600 hover:text-red-600 flex items-center pl-2 rounded-md py-2 dark:border-red-600 dark:text-red-500 dark:hover:border-red-600 dark:hover:text-red-600'
                          : 'border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-white dark:hover:text-white'
                      }
                    >
                      <RiLockPasswordLine />
                      <input
                        type="password"
                        placeholder="********"
                        className={
                          formik.errors.cpassword
                            ? 'w-full px-2 focus:outline-none text-red-600 dark:text-red-500 dark:bg-[#0f121a] placeholder:text-red-400 dark:placeholder:text-red-500 dark:placeholder:text-opacity-30 placeholder:text-opacity-50'
                            : 'w-full px-2 focus:outline-none text-black dark:bg-[#0f121a] dark:text-white dark:placeholder:text-gray-700'
                        }
                        {...formik.getFieldProps('cpassword')}
                        name="cpassword"
                      />
                    </div>
                    <div className="text-center">
                      {formik.errors.cpassword ? (
                        <span className="text-[10px] text-red-500 md:text-[12px]">
                          &#39;{formik.errors.cpassword}&#39;
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </label>
                  {formik.errors.username ||
                  formik.errors.email ||
                  formik.errors.password ||
                  formik.errors.cpassword ? (
                    <span className="bg-gray-400 dark:bg-gray-700 w-full mt-10 text-gray-200 dark:text-gray-500 font-bold text-xl py-2 rounded-3xl flex justify-center cursor-default">
                      Sign-Up
                    </span>
                  ) : (
                    <button
                      type="submit"
                      className="bg-blue-600 w-full mt-10 text-white font-bold text-xl py-2 rounded-3xl dark:hover:bg-white dark:hover:text-[#0f121a] hover:bg-black"
                    >
                      Sign-Up
                    </button>
                  )}
                  <p className="text-xs text-center mt-3 dark:text-gray-500 text-gray-500">
                    Already have an account? Login here.
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
