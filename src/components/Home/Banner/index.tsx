import React, { useEffect, useState } from 'react';
import styles from './Banner.module.scss';
import BannerItem from './BannerItem';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Banner() {
  const [currentId, setCurrentId] = useState(0);
  const [move, setMove] = useState<React.CSSProperties>();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentId((curr) => (curr === totalItems - 1 ? 0 : curr + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
              <p className={styles.tag}>{item.tag}</p>
              <h1 className={styles.mainTitle}>{item.main_title}</h1>
              <p className={styles.subTitle}>{item.sub_title}</p>
            </div>
            <img src={item.img} alt="배너" />
          </div>
        ))}
      </div>
      <button className={styles.leftArrow} onClick={handleBack}>
        <IoIosArrowBack />
      </button>
      <button className={styles.rightArrow} onClick={handleNext}>
        <IoIosArrowForward />
      </button>
    </div>
  );
}
