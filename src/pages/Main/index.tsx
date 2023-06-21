import HotPortfolio from '../../components/Home/HotPortfolio';
import Banner from '../../components/Home/Banner';
import NewPosts from '../../components/Home/NewPosts';
import BestStacks from '../../components/Home/BestStacks';
import Footer from '../../components/Footer';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './main.module.scss';

export default function Main() {
  const isPc = useMediaQuery({
    query : "(min-width:769px)"
  });
  const isMobile = useMediaQuery({
    query : "(max-width:768px)"
  }); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner />
      {isPc && 
        <div className={styles.container}>
          <NewPosts />
          <HotPortfolio />
          <BestStacks />
        </div>
      }
      {isMobile && 
        <div className={styles.container}>
          <NewPosts />
          <HotPortfolio />
          <BestStacks />
        </div>
      }
      <Footer />
    </div>
  );
}
