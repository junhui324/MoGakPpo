import { useState } from 'react';
import styles from './Category.module.scss';

function Category() {
  const categories = ['전체', '프론트엔드', '백엔드', '디자인', '기획', '기타'];
  const [selectedCategory, setSelectedCategory] = useState('전체');
  return (
    <div className={styles.container}>
      <ul>
        <h2>📂 카테고리</h2>
        {categories.map((name, index) => {
          return (
            <li
              className={selectedCategory === name ? styles.selected : undefined}
              key={index}
              onClick={() => {
                setSelectedCategory(name);
              }}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Category;
