import React from 'react';

// component
import PortfolioSearch from '../../components/PortfolioList/PortfolioSearch';
import PortfolioListWrap from '../../components/PortfolioList/PortfolioListWrap';

// 스타일
import styles from './PortfolioList.module.scss';

function PortfolioList() {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <PortfolioSearch />
      </div>
      <div className={styles.listContainer}>
        <PortfolioListWrap />
      </div>
    </div>
  );
}

export default PortfolioList;
