import { useState, useEffect, ChangeEvent } from 'react';
import { getStackList } from '../../apis/Fetcher';
import styles from './stack.module.scss';

function Stack() {
  const [selected, setSelected] = useState<string[]>([]);
  const [stacks, setStacks] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getStackData = async () => {
    try {
      const data = await getStackList() as unknown as { stackList: string[]};
      setStacks(data.stackList);
    } catch (error) {
      console.error('스택을 가져오지 못했어요');
    }
  };

  const handleDelete = (stack: string) => {
    setSelected(prevSelected => 
      prevSelected.filter(selectedStack => selectedStack !== stack));
  }
    
  const handleAdd = (stack: string) => {
    if (!selected.includes(stack)) {
      setSelected(prevSelected => [...prevSelected, stack]);
    }
  }
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchWord(value);

    const filteredSuggestions = getSuggestions(value);
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchWord(suggestion);
    setSuggestions([]);
    handleAdd(suggestion);
    setSearchWord('');
  };

  const getSuggestions = (value: string) => {
    // 로컬에 저장된 데이터를 필터링
    return stacks.filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );
  };

  useEffect(() => {
    getStackData();
  }, []);

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
      <input 
        className={styles.input} 
        type='text'
        value={searchWord}
        onChange={handleInputChange}
        placeholder='기술 스택을 검색해 보세요.'
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionContainer}>
          {suggestions.map((suggestion, index) => (
            <li 
              className={styles.suggestion}
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
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