import Paper from '@mui/material/Paper';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { PlaceHolder } from '@/types/enum';
import { encodeToBase64, getNewBodyPath } from '@/services';
import { usePathname } from 'next/navigation';

export interface RequestBodyEditorProps {
  mode: string;
}

export default function RequestBodyEditor({ mode }: RequestBodyEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const pathname = usePathname();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const editor = editorRef.current;
    setValue(PlaceHolder[mode as keyof typeof PlaceHolder]);
    if (editor) {
      editor.focus();
    }
  }, [mode]);

  useEffect(() => {
    const editor = editorRef.current;
    let dispose: monaco.IDisposable | undefined;
    if (editor) {
      dispose = editor.onDidBlurEditorWidget(onBlur);
    }
    return () => {
      if (dispose) {
        dispose.dispose();
      }
    };
  }, [value]);

  const onBlur = () => {
    try {
      let encodedValue: string;
      if (mode === 'json') {
        const parsedValue = JSON.parse(value);
        encodedValue = encodeToBase64(JSON.stringify(parsedValue));
      } else {
        encodedValue = encodeToBase64(value);
      }
      const newPath = getNewBodyPath(pathname, encodedValue);
      window.history.replaceState(null, '', newPath);
    } catch (e) {
      // TODO add a component to display the error
      if (e instanceof Error) console.error('Invalid JSON:', e.message);
    }
  };

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleChange = (value: string | undefined) => {
    if (value) {
      setValue(value);
    }
  };

  return (
    <Paper sx={{ width: '100%', minHeight: '60svh' }}>
      <Editor language={mode} height="65vh" value={value} onChange={handleChange} onMount={handleEditorDidMount} />
    </Paper>
  );
}
