import { themeAtom } from '../../../recoil/themeState';
import { useRecoilState } from 'recoil';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import styles from './ToggleDarkMode.module.scss';
import { useEffect } from 'react';

export default function ToggleDarkModeButton() {
  const [darkMode, setDarkMode] = useRecoilState(themeAtom);

  useEffect(() => {
    //os기본설정이 다크모드이면서 로컬스토리지에 저장된 테마가 없을 때
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (!localStorage.getItem('theme')) {
        setDarkMode(true);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  return (
    <button className={styles.themeButton} onClick={toggleDarkMode}>
      {darkMode ? <RiSunFill size={24} /> : <RiMoonClearFill size={24} />}
    </button>
  );
}
