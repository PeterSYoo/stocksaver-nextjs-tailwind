import { useMutation } from '@tanstack/react-query';

type Data = {
  username: string;
  password: string;
};

type SignIn = {
  redirect: boolean;
  username: string;
  password: string;
  callbackUrl: string;
};

const useHandleSignin = (
  signIn: (arg0: string, arg1: SignIn) => any,
  setIsUsernameErrorModalOpen: (arg0: boolean) => void,
  setIsPasswordErrorModalOpen: (arg0: boolean) => void,
  router: any
) => {
  const { mutateAsync: mutateHandleSignin, isLoading: isLoadingHandleSignin } =
    useMutation(async (data: Data) => {
      try {
        const status = await signIn('credentials', {
          redirect: false,
          username: data.username,
          password: data.password,
          callbackUrl: '/dashboard',
        });

        if (status.error === 'No user found with that Username!') {
          setIsUsernameErrorModalOpen(true);
        } else if (status.error === 'Wrong password!') {
          setIsPasswordErrorModalOpen(true);
        } else if (status.ok) {
          router.push(status.url);
        }
      } catch (error) {
        return error;
      }
    });

  return {
    mutateHandleSignin,
    isLoadingHandleSignin,
  };
};

export default useHandleSignin;
