import styles from './BestStacks.module.scss';
import { getStackList } from '../../../apis/Fetcher';
import { useEffect, useState } from 'react';

export default function BestStacks() {
  const [bestStacks, setBestStacks] = useState();

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
  }, []);
  return (
    <div>
      <div className={styles.titleTextWrapper}>
        <h1>인기 기술 스택 순위</h1>
        <p>모프에서 가장 인기있는 기술스택이예요!</p>
      </div>
      {/* @ts-ignore */}
      {bestStacks.map((stack, index) => (
        <div key={`stack-${index}`}>{stack}</div>
      ))}
    </div>
  );
}
