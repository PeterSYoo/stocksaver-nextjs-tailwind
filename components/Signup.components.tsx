import { useFormik } from 'formik';
import { useRouter } from 'next/router';

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
      <div className=""></div>
    </>
  );
};
