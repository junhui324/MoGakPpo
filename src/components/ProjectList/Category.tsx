import { PROJECT_RECRUITMENT_ROLES } from '../../constants/project';
import styles from './Category.module.scss';
import { useMediaQuery } from 'react-responsive';

interface CategoryProps {
  handleClick: (key: string) => void;
  selectedCategory: string;
}
function Category({ handleClick, selectedCategory }: CategoryProps) {
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });

  const categories = Object.entries(PROJECT_RECRUITMENT_ROLES);
  categories.unshift(['all', '전체']);

  return (
    <div
      className={
        !isMobile ? `${styles.container}` : `${styles.container} ${styles.mobileContainer}`
      }
    >
      <ul>
        {!isMobile && <h2>📂 카테고리</h2>}
        {categories.map(([key, value]) => {
          const newKey = key;

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
