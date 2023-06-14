import { themeState } from '../../../recoil/themeState';
import { useRecoilState } from 'recoil';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

export default function ToggleDarkModeButton() {
  const [darkMode, setDarkMode] = useRecoilState(themeState);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return <button onClick={toggleDarkMode}>{darkMode ? <RiSunFill /> : <RiMoonClearFill />}</button>;
}
