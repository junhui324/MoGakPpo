import styles from './tab.module.scss';

interface TypeTab {
  tabs: string[];
  currTab: string;
  onClick: (currTab: string) => void;
}

function Tab({ tabs, currTab, onClick }: TypeTab) {
  return (
    <div className={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = currTab === tab;
        const activeTab = isActive ? `${styles.active}` : '';

        return (
          <div 
            key={`${tab}=${index}`}
            className={activeTab}
            onClick={() => onClick(tab)}
          >
            {tab}
          </div>
        )
      })}
    </div>
  )
}

export default Tab;