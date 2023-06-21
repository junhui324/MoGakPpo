import LoadingSpinner from '../../components/common/Loading/LoadingSpinner';
import React, { Suspense, useState } from 'react';
import styles from './PortfolioDetail.module.scss';
const PortfolioDetailForm = React.lazy(
  () => import('../../components/PortfolioDetailForm/PortfolioDetailForm')
);
const Comment = React.lazy(() => import('../../components/Comment'));

type TypeAuthorData = {
  user_id: number;
};

function PortfolioDetail() {
  const [authorData, setAuthorData] = useState<TypeAuthorData | null>(null);

  const authorForComment = (user_id: number) => {
    setAuthorData({ user_id: user_id });
  };

  return (
    <div className={styles.container}>
      <Suspense fallback={<LoadingSpinner />}>
        <PortfolioDetailForm authorForComment={authorForComment} />
        <Comment authorData={authorData} />
      </Suspense>
    </div>
  );
}

export default PortfolioDetail;
function setAuthor(id: any) {
  throw new Error('Function not implemented.');
}
