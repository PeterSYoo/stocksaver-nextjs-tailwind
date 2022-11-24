import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { BsFillSunFill, BsMoonStars } from 'react-icons/bs';

export const ThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <>
          <button onClick={() => setTheme('light')} type="button">
            <BsFillSunFill className="h-5 md:h-8" size={25} />
          </button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => setTheme('dark')} type="button">
            <BsMoonStars className="h-5 md:h-8" size={25} />
          </button>
        </>
      );
    }
  };

  return <>{renderThemeChanger()}</>;
};
