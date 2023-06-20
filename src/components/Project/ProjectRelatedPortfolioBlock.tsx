import { useEffect, useState } from 'react';
import { TypePortfolioList } from '../../interfaces/Portfolio.interface';
import PortfolioCell from '../PortfolioList/PortfolioCell';

import styles from './ProjectRelatedPortfolioBlock.module.scss';
import { HiOutlineLightBulb } from 'react-icons/hi2';

function ProjectRelatedPortfolioBlock({ portfolio }: { portfolio: TypePortfolioList | null }) {
  if (!portfolio) return <></>;

  return (
    <div className={styles.container}>
      <HiOutlineLightBulb className={styles.bulbLogo} />
      <p className={styles.announcement}>관련 프로젝트가 있어요 !</p>
      <div className={styles.portfolio}>
        <PortfolioCell portfolio={portfolio} />
      </div>
    </div>
  );
}

export default ProjectRelatedPortfolioBlock;
