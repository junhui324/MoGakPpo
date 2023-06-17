import React, { useEffect, useState } from 'react';
import styles from './Banner.module.scss';
import BannerItem from './BannerItem';

export default function Banner() {
  const [currentId, setCurrentId] = useState(0);
  const [move, setMove] = useState<React.CSSProperties>();

  const totalItems = BannerItem.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentId((curr) => (curr === totalItems - 1 ? 0 : curr + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [totalItems]);

  useEffect(() => {
    setMove(() => ({ transform: `translateX(-${currentId * 100}%)` }));
  }, [currentId]);

  const handleIndicatorClick = (id: number) => {
    setCurrentId(id);
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.slideArea}>
        <div className={styles.bannerList} style={move}>
          {BannerItem.map((item) => (
            <div key={item.id} className={styles.bannerItem}>
              <div className={styles.bannerText}>
                <p className={styles.tag}>{item.tag}</p>
                <h1 className={styles.mainTitle}>{item.main_title}</h1>
                <p className={styles.subTitle}>{item.sub_title}</p>
              </div>
              <img src={item.img} alt="배너" />
            </div>
          ))}
        </div>
        <div className={styles.indicatorContainer}>
          {BannerItem.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.indicator} ${currentId === index ? styles.active : ''}`}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
