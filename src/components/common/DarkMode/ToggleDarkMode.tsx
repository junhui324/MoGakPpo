import { themeAtom } from '../../../recoil/themeState';
import { useRecoilState } from 'recoil';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import { useEffect } from 'react';

export default function ToggleDarkModeButton() {
  const [darkMode, setDarkMode] = useRecoilState(themeAtom);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  return <button onClick={toggleDarkMode}>{darkMode ? <RiSunFill /> : <RiMoonClearFill />}</button>;
}
