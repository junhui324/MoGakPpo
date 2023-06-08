import React, { useEffect, useState } from 'react';
import styles from './Banner.module.scss';
import BannerItem from './BannerItem';

export default function Banner() {
  const [currentId, setCurrentId] = useState(0);
  const [move, setMove] = useState<React.CSSProperties>();

  useEffect(() => {
    setMove(() => ({ transform: `translateX(-${currentId * 100}%)` }));
  }, [currentId]);

  const totalItems = BannerItem.length;

  const handleBack = () => {
    setCurrentId((curr) => (curr === 0 ? totalItems - 1 : curr - 1));
  };

  const handleNext = () => {
    setCurrentId((curr) => (curr === totalItems - 1 ? 0 : curr + 1));
  };

  return (
    <div className={styles.slideArea}>
      <div className={styles.bannerList} style={move}>
        {BannerItem.map((item) => (
          <div key={item.id} className={styles.bannerItem}>
            <div className={styles.bannerText}>
              <p>{item.tag}</p>
              <h1>{item.main_title}</h1>
              <p>{item.sub_title}</p>
            </div>
            <img src={item.img} alt="배너" />
          </div>
        ))}
      </div>
      <button onClick={handleBack}>◀️</button>
      <span>{currentId + 1}</span>
      <button onClick={handleNext}>▶️</button>
    </div>
  );
}
