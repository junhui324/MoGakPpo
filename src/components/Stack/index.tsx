import { useState } from 'react';
import styles from './stack.module.scss';

function Stack() {
  // 임시 테스트용 stack 배열
  const [selected, setSelected] = useState<string[]>([]);
  const total = ['React', 'JavaScript', 'TypeScript', 'Kotlin', 'HTML/CSS', 'Android', 'Node.js', 'Express.js'];

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
            <div className={styles.stackWrapper}>
              <div 
                className={styles.selectedStack} 
                key={`${stack}-${id}`}
              >
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
        {total.map((stack, id) => {
          const isDuplicate = selected.includes(stack);
          const stackClassName = isDuplicate ? styles.duplicateStack : styles.uniqueStack;
          const handleClickStack = isDuplicate ? handleDelete : handleAdd;

          return (
            <div className={styles.stackWrapper}>
              <div 
                className={stackClassName} 
                key={`${stack}-${id}`}
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