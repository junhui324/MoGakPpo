import { PROJECT_RECRUITMENT_ROLES } from '../../constants/project';
// import { useState } from 'react';
import styles from './Category.module.scss';

interface CategoryProps {
  handleClick: (key: string) => void;
  selectedCategory: string;
}
function Category({ handleClick, selectedCategory }: CategoryProps) {
  const categories = Object.entries(PROJECT_RECRUITMENT_ROLES);
  categories.unshift(['ALL', '전체']);

  return (
    <div className={styles.container}>
      <ul>
        <h2>📂 카테고리</h2>
        {categories.map(([key, value]) => {
          const newKey = `"${key}"`;

          return (
            <li
              className={selectedCategory === newKey ? styles.selected : undefined}
              key={newKey}
              onClick={() => {
                handleClick(newKey);
              }}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Category;
