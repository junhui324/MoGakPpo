import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import './editor.css';
import 'quill/dist/quill.snow.css';
import { HighlightModules } from './Highlight';
import styles from './Editor.module.scss';

interface QuillEditorProps {
  innerRef: any;
}
const QuillEditor = ({ innerRef }: QuillEditorProps) => {
  return <div ref={innerRef} className={styles.editor} id="editor-container" />;
};

export default QuillEditor;
