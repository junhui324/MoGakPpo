import HotPortfolio from '../../components/Home/HotPortfolio';
import Banner from '../../components/Home/Banner';
import NewPosts from '../../components/Home/NewPosts';
import Footer from '../../components/Footer';

export default function Main() {
  return (
    <>
      <Banner />
      <NewPosts />
      <HotPortfolio />
      <Footer />
    </>
  );
}
