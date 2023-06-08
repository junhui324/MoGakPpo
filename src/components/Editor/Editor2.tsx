import React, { useCallback, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
// import 'quill/dist/quill.snow.css';

function base64ToFile(base64Image: string, fileName: string) {
  // base64 데이터를 Blob 객체로 변환합니다.
  const byteString = atob(base64Image.split(',')[1]);
  const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });

  // Blob 객체를 File 객체로 변환합니다.
  const file = new File([blob], fileName, { type: mimeString });
  return file;
}

interface QuillEditorProps {
  savedValue: string;
  onEditorValueChange: (content: string) => void;
}
const QuillEditor = ({ savedValue, onEditorValueChange }: QuillEditorProps) => {
  const [imgFiles, setImgFiles] = useState([]);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    quillRef.current = new Quill('#editor-container', {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link', 'code-block'],
          ['image'],
          [{ imageDrop: true, imagePaste: true }],
        ],
      },
      placeholder: '내용을 입력하세요...',
      theme: 'snow',
    });
  }, []);

  // const base64Image = ''; // base64 이미지 데이터
  // const file = dataURLtoFile(base64Image, 'image.jpg'); // 파일로 변환

  // 텍스트 변경 시 상위 컴포넌트의 이벤트 처리
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.on('text-change', () => {
        const value = quillRef.current!.root.innerHTML;
        onEditorValueChange(value);
      });
    }

    // 이미지가 삽입될 때마다 파일 변환해서 배열에 추가하
    // if (quillRef.current) {
    //   quillRef.current.on('text-change', (e: any) => {
    //     //삽입된 텍스트 종류가 이미지일 경우 base64 코드 찾아내기
    //     const insertObj = e.ops.find(
    //       (item: { insert: { insert: { image: string } } }) => 'insert' in item
    //     );
    //     const imageData = insertObj && insertObj.insert.image;
    //     const fileName = `${new Date()}`;
    //     if (imageData) {
    //       const file = base64ToFile(imageData, fileName);
    //       console.log(file);
    //     }
    //   });
    // }
  }, [onEditorValueChange]);

  // 임시저장 된 값||수정이 필요한 값 이 있는 경우 불러오기
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.root.innerHTML = savedValue;
    }
  }, [savedValue]);

  // 제출을 눌렀을 때 base64코드만 찾아서 업로드하기
  const findBase64 = () => {
    if (quillRef.current) {
      quillRef.current.on('text-change', () => {
        const value = quillRef.current!.root.innerHTML;
        onEditorValueChange(value);
      });
    }
  };

  return <div id="editor-container" />;
};

export default QuillEditor;
