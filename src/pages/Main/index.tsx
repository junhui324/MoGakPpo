import HotPortfolio from '../../components/Home/HotPortfolio';
import Banner from '../../components/Home/Banner';
import NewPosts from '../../components/Home/NewPosts';
import BestStacks from '../../components/Home/BestStacks';
import Footer from '../../components/Footer';

export default function Main() {
  return (
    <>
      <Banner />
      <NewPosts />
      <HotPortfolio />
      <BestStacks />
      <Footer />
    </>
  );
}
