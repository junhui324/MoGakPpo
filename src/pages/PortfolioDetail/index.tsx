//import PortfolioDetailForm from '../../components/PortfolioDetailForm/PortfolioDetailForm';
//import Comment from '../../components/Comment';
import LoadingSpinner from '../../components/common/Loading/LoadingSpinner';
import React, { Suspense } from 'react';
const PortfolioDetailForm = React.lazy(
  () => import('../../components/PortfolioDetailForm/PortfolioDetailForm')
);
const Comment = React.lazy(() => import('../../components/Comment'));

function PortfolioDetail() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PortfolioDetailForm />
      {/* <Comment authorData={35} /> */}
    </Suspense>
  );
}

export default PortfolioDetail;
