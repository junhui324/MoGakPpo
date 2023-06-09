import React, { useEffect, useRef, useState } from 'react';

// component
import PortfolioSearch from '../../components/PortfolioList/PortfolioSearch';
import PortfolioListWrap from '../../components/PortfolioList/PortfolioListWrap';

// 스타일
import styles from './PortfolioList.module.scss';

const DEBOUNCING = 250;

function PortfolioList() {
  const [value, setValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const timer = useRef<NodeJS.Timer | null>(null);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    setValue(() => event.target.value);

    // utils의 debounce가 의도대로 작동하지 않아, 직접 디바운싱 진행
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => setKeyword(() => event.target.value), DEBOUNCING);
  };

  // 렌더링 시에 수행합니다.
  useEffect(() => {
    // 윈도우 스크롤을 초기화 합니다.
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={styles.container}
      style={{ maxWidth: 1024, minHeight: '100vh', margin: '45px auto' }}
    >
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
