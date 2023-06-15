import HotPortfolio from '../../components/Home/HotPortfolio';
import Banner from '../../components/Home/Banner';
import NewPosts from '../../components/Home/NewPosts';
import BestStacks from '../../components/Home/BestStacks';
import Footer from '../../components/Footer';
import { useEffect } from 'react';
import { themeAtom } from '../../recoil/themeState';
import { useRecoilValue } from 'recoil';

export default function Main() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Banner />
      <div style={{ maxWidth: 1024, margin: '0 auto' }}>
        <NewPosts />
        <HotPortfolio />
        <BestStacks />
      </div>
      <Footer />
    </div>
  );
}
