import LoadingSpinner from '../../components/common/Loading/LoadingSpinner';
import React, { Suspense } from 'react';
import styles from './PortfolioDetail.module.scss';
const PortfolioDetailForm = React.lazy(
  () => import('../../components/PortfolioDetailForm/PortfolioDetailForm')
);
const Comment = React.lazy(() => import('../../components/Comment'));

function PortfolioDetail() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<LoadingSpinner />}>
        <PortfolioDetailForm />
        <Comment />
      </Suspense>
    </div>
  );
}

export default PortfolioDetail;
