import styles from './BestStacks.module.scss';
import { getStackList } from '../../../apis/Fetcher';
import React, { useEffect, useState } from 'react';
import { RxBorderDotted } from 'react-icons/rx';

export default function BestStacks() {
  const [bestStacks, setBestStacks] = useState([]);

  const getStackListData = async () => {
    try {
      const response = await getStackList();
      //@ts-ignore
      setBestStacks(response.data.stackList.bestStacks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStackListData();
    const interval = setInterval(() => {
      getStackListData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={styles.titleTextWrapper}>
        <h1>인기 기술 스택 순위</h1>
        <p>모프에서 가장 인기있는 기술스택이예요!</p>
      </div>
      <div className={styles.stackList}>
        {bestStacks && bestStacks.length > 0 ? (
          bestStacks.map((stack, index) => (
            <div key={`${stack}-${index}`} className={styles.stackContainer}>
              <span className={styles.stackRank}>
                {index + 1}
                <RxBorderDotted />
              </span>
              <span className={styles.stackName}>{stack}</span>
            </div>
          ))
        ) : (
          <p className={styles.noContent}>아직 인기 순위를 집계하고 있어요:)</p>
        )}
      </div>
    </div>
  );
}
