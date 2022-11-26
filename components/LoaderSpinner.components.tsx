import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonLoader } from 'react-spinners';

export const LoaderSpinner = () => {
  const { systemTheme, theme } = useTheme();
  const [hydrated, setHydrated] = useState(false);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (currentTheme === 'dark') {
    return (
      <>
        <div className="min-w-screen min-h-screen mt-20 flex justify-center">
          <MoonLoader color="#cccccc" size="30px" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="min-w-screen min-h-screen mt-20 flex justify-center">
          <MoonLoader color="#545454" size="30px" />
        </div>
      </>
    );
  }
};
