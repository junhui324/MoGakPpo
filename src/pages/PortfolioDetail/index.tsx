import PortfolioDetailForm from '../../components/PortfolioDetailForm/PortfolioDetailForm';
import Comment from '../../components/Comment';
import styles from './PortfolioDetail.module.scss';

function PortfolioDetail() {
  return (
    <div className={styles.container}>
      <PortfolioDetailForm />
      <Comment />
    </div>
  );
}

export default PortfolioDetail;
