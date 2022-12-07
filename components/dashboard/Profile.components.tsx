import { Playfair_Display } from '@next/font/google';
import { WinnersCard } from './WinnersCard.components';
import { LosersCard } from './LosersCard.components';
import { useEffect, useRef, useState } from 'react';
import { BsFillImageFill } from 'react-icons/bs';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getUser, updateUser } from '../../lib/usersHelper';
import { LoaderSpinnerSearch } from '../LoaderSpinnerSearch.components';
import { LoaderSpinner2 } from '../LoaderSpinner2.components';

const playfair = Playfair_Display({
  subsets: ['latin'],
});

export const Profile = ({ user, winner, loser, tickers }: any) => {
  const [imageSrc, setImageSrc] = useState<any>();
  const [uploadData, setUploadData] = useState<any>();
  const [tempUser, setTempUser] = useState<any>();
  const inputFileRef = useRef<any>(null);

  const handleInputFileClick = () => {
    inputFileRef.current.click();
  };

  const handleOnChange = async (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'tickersaver');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dryh1nvhk/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((res) => res.json());

    if (!data.error) {
      setImageSrc(data.secure_url);
      setUploadData(data);
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      setTempUser(user);
      // console.log(tempUser);
    }
  }, [user]);

  useEffect(() => {
    if (tempUser?.image !== undefined) {
      setImageSrc(tempUser?.image);
    }
  }, [tempUser]);

  useEffect(() => {
    if (tempUser?._id !== undefined && uploadData?.secure_url !== undefined) {
      updateUser(tempUser._id, uploadData.secure_url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadData]);

  return (
    <>
      {user ? (
        <>
          <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-10 py-7 grid grid-cols-2 md:grid-cols-12 dark:shadow-dark3xl dark:bg-dark mx-auto">
            <div className="flex flex-col items-center justify-center md:col-start-1 md:col-span-2">
              <form>
                <input
                  type="file"
                  name="file"
                  onChangeCapture={handleOnChange}
                  ref={inputFileRef}
                  hidden
                />
                <div
                  className={
                    imageSrc
                      ? 'h-36 w-36 flex justify-center items-center shadow-md shadow-gray-500 dark:shadow-dark3xl rounded-full dark:bg-black bg-black'
                      : 'bg-gray-200 h-36 w-36 rounded-full shadow-md shadow-gray-500 dark:bg-black dark:shadow-dark3xl flex justify-center items-center'
                  }
                >
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={user?.username}
                      height={150}
                      width={150}
                      className="object-contain aspect-square rounded-full mix-blend-screen"
                    />
                  ) : null}
                </div>

                <div
                  onClick={handleInputFileClick}
                  className="relative h-7 w-7 flex justify-center items-center bottom-[23px] left-[110px] bg-gray-200 rounded-full dark:bg-[#575653] dark:shadow-none shadow-md shadow-gray-500 dark:hover:bg-[#575653] dark:text-black dark:hover:text-white hover:bg-black hover:text-white cursor-pointer"
                >
                  <BsFillImageFill />
                </div>
              </form>
              <div className="flex flex-col items-center md:-mt-4">
                <h1 className="text-2xl font-bold mb-1 hidden md:block">
                  <span className={playfair.className}>
                    <span className="text-blue-700 dark:text-blue-400">@</span>
                    {user?.username}
                  </span>
                </h1>
                <h1 className="text-md hidden md:block">
                  Tickers:&nbsp;
                  <span className="dark:text-red-500 text-red-600 font-bold">
                    {tickers?.length}
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center md:col-start-3 md:col-span-10">
              <h1 className="text-2xl font-bold mb-1 md:hidden">
                <span className={playfair.className}>
                  &nbsp;
                  <span className="text-blue-700 dark:text-blue-400">@</span>
                  {user?.username}
                </span>
              </h1>
              <h1 className="text-md md:hidden">
                Tickers:&nbsp;
                <span className="dark:text-red-500 text-red-600 font-bold">
                  {tickers?.length}
                </span>
              </h1>
              <div className="md:flex gap-10 hidden ml-12 justify-center">
                <WinnersCard winner={winner} />
                <LosersCard loser={loser} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoaderSpinner2 />
      )}
    </>
  );
};
