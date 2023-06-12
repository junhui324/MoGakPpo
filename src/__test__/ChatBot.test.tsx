import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ChatBot from '../components/ChatBot';

describe('챗봇을 렌더링합니다.', () => {
  test('챗봇 컴포넌트 렌더링 성공', () => {
    render(<ChatBot />);
  });
});