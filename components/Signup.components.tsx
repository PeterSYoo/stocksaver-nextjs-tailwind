import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiUser } from 'react-icons/bi';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

interface Values {
  username: String;
  email: String;
  password: String;
  cpassword: String;
}

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
    // validate: ,
    onSubmit,
  });

  return (
    <>
      <form>
        <div className="md:mx-10">
          <div className="max-w-[327px] md:max-w-[937px] animate-border rounded-3xl from-purple-500 via-teal-500 to-blue-500 bg-[length:400%_400%] p-0.5 dark:bg-black dark:bg-gradient-to-r mx-auto">
            <div className="bg-white pt-4 md:pt-0 rounded-3xl shadow-md shadow-gray-500 md:grid md:grid-cols-2 dark:shadow-none dark:bg-[#0f121a]">
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-center md:text-3xl">
                  Sign-Up!
                </h1>
                <div className="px-10">
                  <label>
                    <h3 className="mt-5">Username:</h3>
                    <div className="border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-white dark:hover:text-white">
                      <BiUser />
                      <input
                        type="text"
                        className="w-full px-2 focus:outline-none text-black dark:bg-[#0f121a] dark:text-white"
                      />
                    </div>
                  </label>
                  <label>
                    <h3 className="mt-2">Email:</h3>
                    <div className="border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-white dark:hover:text-white">
                      <MdAlternateEmail />
                      <input
                        type="email"
                        className="w-full px-2 focus:outline-none text-black dark:bg-[#0f121a] dark:text-white"
                      />
                    </div>
                  </label>
                  <label>
                    <h3 className="mt-2">Password:</h3>
                    <div className="border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-white dark:hover:text-white">
                      <RiLockPasswordLine />
                      <input
                        type="password"
                        className="w-full px-2 focus:outline-none text-black dark:bg-[#0f121a] dark:text-white"
                      />
                    </div>
                  </label>
                  <label>
                    <h3 className="mt-2">Confirm Password:</h3>
                    <div className="border border-gray-400 text-gray-400 hover:border-black hover:text-black flex items-center pl-2 rounded-md py-2 dark:border-gray-700 dark:text-gray-700 dark:hover:border-white dark:hover:text-white">
                      <RiLockPasswordLine />
                      <input
                        type="password"
                        className="w-full px-2 focus:outline-none text-black dark:bg-[#0f121a] dark:text-white"
                      />
                    </div>
                  </label>
                  <button
                    type="submit"
                    className="bg-blue-600 w-full mt-10 text-white font-bold text-xl py-2 rounded-3xl dark:hover:bg-white dark:hover:text-[#0f121a] hover:bg-black"
                  >
                    Sign-Up
                  </button>
                  <p className="text-xs text-center mt-3">
                    Already have an account? Login here.
                  </p>
                </div>
              </div>
              <div className="">
                <Image
                  src="https://i.imgur.com/MdS6y7x.png"
                  width={466}
                  height={539}
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
