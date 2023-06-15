import HotPortfolio from '../../components/Home/HotPortfolio';
import Banner from '../../components/Home/Banner';
import NewPosts from '../../components/Home/NewPosts';
import BestStacks from '../../components/Home/BestStacks';
import Footer from '../../components/Footer';
import { useEffect } from 'react';
import { themeState } from '../../recoil/themeState';
import { useRecoilValue } from 'recoil';

export default function Main() {
  const darkMode = useRecoilValue(themeState);
  const toggleStyle = {
    backgroundColor: darkMode ? '#000' : '#fff',
    color: darkMode ? '#fff' : '#000',
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Banner />
      <NewPosts />
      <HotPortfolio />
      <BestStacks />
      <Footer />
    </div>
  );
}
