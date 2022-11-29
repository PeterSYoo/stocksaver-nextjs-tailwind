import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonLoader } from 'react-spinners';

export const LoaderSpinner2 = () => {
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
        <div className="flex justify-center mb-5">
          <MoonLoader color="#cccccc" size="25px" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-center mb-5">
          <MoonLoader color="#545454" size="25px" />
        </div>
      </>
    );
  }
};
