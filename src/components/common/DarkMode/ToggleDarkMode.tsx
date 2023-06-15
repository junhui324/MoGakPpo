import { themeState } from '../../../recoil/themeState';
import { useRecoilState } from 'recoil';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import { useEffect } from 'react';

export default function ToggleDarkModeButton() {
  const [darkMode, setDarkMode] = useRecoilState(themeState);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem('dark-mode', `${darkMode}`);
  }, [darkMode]);
  return <button onClick={toggleDarkMode}>{darkMode ? <RiSunFill /> : <RiMoonClearFill />}</button>;
}
