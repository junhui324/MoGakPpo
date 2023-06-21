import HotPortfolio from '../../components/Home/HotPortfolio';
import Banner from '../../components/Home/Banner';
import NewPosts from '../../components/Home/NewPosts';
import BestStacks from '../../components/Home/BestStacks';
import Footer from '../../components/Footer';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

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
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>
          <NewPosts />
          <HotPortfolio />
          <BestStacks />
        </div>
      }
      {isMobile && 
        <div style={{ maxWidth: 768, margin: '0 auto' }}>
          <NewPosts />
          <HotPortfolio />
          <BestStacks />
        </div>
      }
      <Footer />
    </div>
  );
}
