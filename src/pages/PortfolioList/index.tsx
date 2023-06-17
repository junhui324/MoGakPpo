import React, { useState } from 'react';

// component
import PortfolioSearch from '../../components/PortfolioList/PortfolioSearch';
import PortfolioListWrap from '../../components/PortfolioList/PortfolioListWrap';

// 스타일
import styles from './PortfolioList.module.scss';

function PortfolioList() {
  const [value, setValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    setValue(() => event.target.value);
    setKeyword(() => event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <PortfolioSearch onSearch={handleSearch} value={value} />
      </div>
      <div className={styles.listContainer}>
        <PortfolioListWrap keyword={keyword} />
      </div>
    </div>
  );
}

export default PortfolioList;
