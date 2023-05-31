import { useState, useEffect } from 'react';
import { getStackList } from '../../apis/Fetcher';
import styles from './stack.module.scss';

function Stack() {
  const [selected, setSelected] = useState<string[]>([]);
  const [stacks, setStacks] = useState<string[]>([]);

  const getStackData = async () => {
    try {
      const data = await getStackList() as unknown as { stacks: string[]};
      setStacks(data.stacks);
    } catch (error) {
      console.error('스택을 가져오지 못했어요');
    }
  };

  useEffect(() => {
    getStackData();
  }, []);

  function handleDelete(stack: string) {
    setSelected(prevSelected => 
      prevSelected.filter(selectedStack => selectedStack !== stack));
  }

  function handleAdd(stack: string) {
    if (!selected.includes(stack)) {
      setSelected(prevSelected => [...prevSelected, stack]);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>기술 스택을 선택해 주세요</div>
      <div className={styles.stackContainer}>
        {selected.map((stack, id) => {
          return (
            <div className={styles.stackWrapper} key={`${stack}-${id}`}>
              <div className={styles.selectedStack}>
                {stack}
              </div>
              {/* 삭제 svg 넣어야함 */}
              <button 
                className={styles.deleteButton} 
                onClick={() => handleDelete(stack)}
                >
                  x
              </button>
            </div>
          )
        })}
      </div>
      {/* 돋보기 svg 넣어야함 */}
      <input className={styles.input} type='text' placeholder='기술 스택을 검색해 보세요.'/>
      <div className={styles.title}>전체 기술 스택</div>
      <div className={styles.stackContainer}>
        {stacks.map((stack, id) => {
          const isDuplicate = selected.includes(stack);
          const stackClassName = isDuplicate ? styles.duplicateStack : styles.uniqueStack;
          const handleClickStack = isDuplicate ? handleDelete : handleAdd;

          return (
            <div className={styles.stackWrapper} key={`${stack}-${id}`}>
              <div 
                className={stackClassName} 
                onClick={() => handleClickStack(stack)}
              >
                {stack}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Stack;