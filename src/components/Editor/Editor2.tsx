import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import './editor.css';
import 'quill/dist/quill.snow.css';
import { HighlightModules } from './Highlight';
import styles from './Editor.module.scss';

interface QuillEditorProps {
  savedValue: string;
  onEditorValueChange: (content: string) => void;
}
const QuillEditor = ({ savedValue, onEditorValueChange }: QuillEditorProps) => {
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current) {
      return;
    }
    quillRef.current = new Quill('#editor-container', {
      modules: {
        ...HighlightModules,
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link', { 'code-block': 'highlight' }],
          ['image'],
          [{ imageDrop: true, imagePaste: true }],
        ],
      },
      placeholder: '내용을 입력하세요...',
      theme: 'snow',
    });

    const codeBlockElements = document.querySelectorAll('.ql-syntax');
    codeBlockElements.forEach((element) => {
      element.classList.add('code-block');
    });
  }, []);

  // 텍스트 변경 시 상위 컴포넌트의 이벤트 처리
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.on('text-change', () => {
        const value = quillRef.current!.root.innerHTML;
        onEditorValueChange(value);
      });
    }
    return;
  }, [onEditorValueChange]);

  // 임시저장 된 값||수정이 필요한 값 이 있는 경우 불러오기
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.root.innerHTML = savedValue;
    }
  }, [savedValue]);

  return <div className={styles.editor} id="editor-container" />;
};

export default QuillEditor;
