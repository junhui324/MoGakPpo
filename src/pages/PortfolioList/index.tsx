import React, { useState } from 'react';
import debounce from '../../utils/debounce';

// component
import PortfolioSearch from '../../components/PortfolioList/PortfolioSearch';
import PortfolioListWrap from '../../components/PortfolioList/PortfolioListWrap';

// 스타일
import styles from './PortfolioList.module.scss';

const DEBOUNCING = 200;

function PortfolioList() {
  const [value, setValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  let timer: NodeJS.Timer;

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    setValue(() => event.target.value);

    // utils의 debounce가 의도대로 작동하지 않아, 직접 디바운싱 진행
    clearTimeout(timer);
    setTimeout(() => setKeyword(() => event.target.value), DEBOUNCING);
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
