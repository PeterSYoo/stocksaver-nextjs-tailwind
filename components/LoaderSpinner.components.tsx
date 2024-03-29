import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonLoader } from 'react-spinners';

export const LoaderSpinner = () => {
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
        <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <MoonLoader color="#ffffff" size="30px" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <MoonLoader color="#000000" size="30px" />
        </div>
      </>
    );
  }
};
