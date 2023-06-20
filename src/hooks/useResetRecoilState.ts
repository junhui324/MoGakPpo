import { useRecoilTransactionObserver_UNSTABLE, useResetRecoilState } from 'recoil';
import { projectListAtom } from '../recoil/projectListFilter';

// RecoilRoot 컴포넌트 내부에서 Recoil 상태를 초기화 및 관리하는 커스텀 훅
export function useResetRecoilStateOnPageChange() {
  const resetProjectListAtom = useResetRecoilState(projectListAtom);

  useRecoilTransactionObserver_UNSTABLE(({ previousSnapshot, snapshot }) => {
    if (!window.history.state?.recoilStatePreserved) {
      const previousProjectList = previousSnapshot.getLoadable(projectListAtom);
      const currentProjectList = snapshot.getLoadable(projectListAtom);

      // 이전 상태와 현재 상태의 projectListAtom 값을 비교하여 초기화
      if (previousProjectList.state !== 'hasError' && currentProjectList.state === 'hasError') {
        resetProjectListAtom();
      }
    }
  });
}
