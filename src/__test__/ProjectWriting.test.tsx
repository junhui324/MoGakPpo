import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ProjectWritingForm from '../pages/PortfolioWriting';

describe('모집글 작성 페이지를 렌더링합니다.', () => {
  test('모집글 작성 페이지 렌더링 성공', () => {
    render(<ProjectWritingForm />);
  });
});
