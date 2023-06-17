import styles from './pagination.module.scss';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

interface PaginationProps {
  currPage: number;
  pageCount: number;
  onClickPage: (pageCount: number) => void;
}

function getPaginationArray(currentPage: number, total: number) {
  const MAX_PAGE_COUNT = 9;
  const resultList = [currentPage];

  let index = 1;
  while (resultList.length < Math.min(MAX_PAGE_COUNT, total)) {
    if (currentPage - index > -1) resultList.unshift(currentPage - index);
    if (currentPage + index < total) resultList.push(currentPage + index);
    index++;
  }

  return resultList;
}

function Pagination({ currPage, pageCount, onClickPage }: PaginationProps) {
  return (
    <div className={styles.container}>
      <button
        className={styles.leftArrow}
        disabled={currPage <= 0}
        onClick={() => currPage > 0 && onClickPage(currPage - 1)}
      >
        <RiArrowLeftSLine />
      </button>
      <div>
        {getPaginationArray(currPage, pageCount).map((page) => {
          return (
            <button
              className={`${styles.button} ${currPage === page ? styles.active : ''}`}
              key={`pagination-button-${page}`}
              onClick={() => onClickPage(page)}
            >
              {page + 1}
            </button>
          );
        })}
      </div>
      <button
        className={styles.rightArrow}
        disabled={currPage >= pageCount - 1}
        onClick={() => currPage < pageCount - 1 && onClickPage(currPage + 1)}
      >
        <RiArrowRightSLine />
      </button>
    </div>
  );
}

export default Pagination;
