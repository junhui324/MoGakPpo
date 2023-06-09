import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './error.module.scss';
import ROUTES from '../../../constants/Routes';

const Error: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`${ROUTES.HOME}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.statusContainer}>
        <div className={styles.status}>404</div>
        <div className={styles.status}>404</div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>앗차차. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</div>
        <div className={styles.description}>
          존재하지 않는 주소를 입력하셨거나, <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.<br />
        </div>
        <button className={styles.button} onClick={handleClick}>
          메인으로
        </button>
      </div>
    </div>
  );
};

export default Error;
