import { themeAtom } from '../../../recoil/themeState';
import { useRecoilState } from 'recoil';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import styles from './ToggleDarkMode.module.scss';

export default function ToggleDarkModeButton() {
  const [darkMode, setDarkMode] = useRecoilState(themeAtom);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  return (
    <button className={styles.themeButton} onClick={toggleDarkMode}>
      {darkMode ? <RiSunFill size={24} /> : <RiMoonClearFill size={24} />}
    </button>
  );
}
