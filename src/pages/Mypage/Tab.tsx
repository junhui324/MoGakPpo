import styles from './tab.module.scss';

interface TypeTab {
  currTab: string;
  onClick: (currTab: string) => void;
}

function Tab({ currTab, onClick }: TypeTab) {
  const tabs = ['게시글', '댓글', '북마크'];
  return (
    <div className={styles.tabContainer}>
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