import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonLoader } from 'react-spinners';

export const LoaderSpinnerSearch = () => {
  // States ------------------------------------------------------------- ***
  const { systemTheme, theme } = useTheme();
  const [hydrated, setHydrated] = useState(false);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Effects ------------------------------------------------------------- ***
  useEffect(() => {
    setHydrated(true);
  }, []);

  // JSX ------------------------------------------------------------------ ***
  if (!hydrated) return null;

  if (currentTheme === 'dark') {
    return (
      <>
        <div className="flex justify-center">
          <MoonLoader color="#ffffff" size="20px" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-center">
          <MoonLoader color="#000000" size="20px" />
        </div>
      </>
    );
  }
};
