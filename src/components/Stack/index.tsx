import { useState, useEffect, ChangeEvent } from 'react';
import { RiCloseFill, RiSearchLine } from 'react-icons/ri';
import { getStackList } from '../../apis/Fetcher';
import styles from './stack.module.scss';

import { useRecoilValue } from 'recoil';
import { classificationState } from '../../recoil/projectState';

interface StackProps {
  selectedStack: string[];
  setStackList: (stacks: string[]) => void;
}

function Stack({ selectedStack, setStackList }: StackProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [bestStacks, setBestStacks] = useState<string[]>([]);
  const [stacks, setStacks] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const classification = useRecoilValue(classificationState);

  const handleDelete = (stack: string) => {
    setSelected((prevSelected) => prevSelected.filter((selectedStack) => selectedStack !== stack));
  };

  const handleAdd = (stack: string) => {
    if (!selected.includes(stack)) {
      setSelected((prevSelected) => [...prevSelected, stack]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchWord(value);

    const filteredSuggestions = getSuggestions(value);
    setSuggestions(filteredSuggestions);
  };

  const handleClickInputCross = () => {
    setSearchWord('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchWord(suggestion);
    setSuggestions([]);
    handleAdd(suggestion);
    setSearchWord('');
  };

  const getSuggestions = (value: string) => {
    // 로컬에 저장된 데이터를 필터링
    const filteredStacks = stacks.filter((item) => {
      const lowerCaseItem = item.toLowerCase();
      const lowerCaseValue = value.toLowerCase();

      return !selected.includes(item) && lowerCaseItem.startsWith(lowerCaseValue);
    });

    return filteredStacks;
  };

  useEffect(() => {
    const getStackData = async () => {
      try {
        const { data } = await getStackList();
        setBestStacks(data.stackList.bestStacks);
        setStacks(data.stackList.stacks);
      } catch (error) {
        console.error('스택을 가져오지 못했어요');
      }
    };
    getStackData();
  }, []);

  // selectedStack 매개변수가 넘어와서 요소가 있다면 선택된 배열에 띄우고 시작하기
  useEffect(() => {
    if (selectedStack.length > 0) {
      setSelected(selectedStack);
    }
  }, [selectedStack]);

  // setStackList 매개변수에 selected 담아주기
  useEffect(() => {
    setStackList(selected);
  }, [selected, classification]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>기술 스택을 선택해 주세요</div>
      <div className={styles.stackContainer}>
        {selected.map((stack, id) => {
          return (
            <div
              className={styles.stackWrapper}
              key={`${stack}-${id}`}
              onClick={() => handleDelete(stack)}
            >
              <div className={styles.selectedStack}>
                {stack}
                <RiCloseFill className={styles.deleteButton} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          value={searchWord}
          onChange={handleInputChange}
          placeholder="기술 스택을 검색해 보세요."
        />
        {searchWord ? (
          <RiCloseFill className={styles.searchButton} onClick={handleClickInputCross} />
        ) : (
          <RiSearchLine className={styles.searchButton} />
        )}
        {suggestions.length > 0 && searchWord.trim().length > 0 && (
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
      </div>
      <div className={styles.title}>인기 기술 스택</div>
      <div className={styles.stackContainer}>
        {bestStacks.map((stack, id) => {
          const isDuplicate = selected.includes(stack);
          const stackClassName = isDuplicate ? styles.duplicateStack : styles.uniqueStack;
          const handleClickStack = isDuplicate ? handleDelete : handleAdd;

          return (
            <div className={styles.stackWrapper} key={`${stack}-${id}`}>
              <div className={stackClassName} onClick={() => handleClickStack(stack)}>
                {stack}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stack;
