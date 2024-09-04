'use client';

import Paper from '@mui/material/Paper';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import { BodyType, PlaceHolder, SegmentIndex } from '@/types';
import { encodeToBase64, getNewBodyPath } from '@/services';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { ErrorsMessage } from '@/components';

export interface RequestBodyEditorProps {
  mode: string;
}

export default function RequestBodyEditor({ mode }: RequestBodyEditorProps) {
  const editorRef = useRef<Nullable<monaco.editor.IStandaloneCodeEditor>>(null);
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const lng = pathSegments.at(SegmentIndex.Languague) || 'en';
  const { t } = useTranslation(lng);
  const [value, setValue] = useState<string>('');
  const [showErrorsPopover, setShowErrorsPopover] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onBlur = useCallback(() => {
    try {
      let encodedValue: string;
      if (mode === BodyType.json) {
        const parsedValue = JSON.parse(value);
        encodedValue = encodeToBase64(JSON.stringify(parsedValue));
      } else {
        encodedValue = encodeToBase64(value);
      }
      const newPath = getNewBodyPath(pathname, encodedValue);
      window.history.replaceState(null, '', newPath);
    } catch (e) {
      if (e instanceof Error) {
        const newSegments = pathSegments.slice(0, SegmentIndex.Body);
        window.history.replaceState(null, '', newSegments.join('/'));
        setErrorMessage(`Invalid JSON: ${e.message}`);
        setShowErrorsPopover(true);
      }
    }
  }, [mode, value, pathname, pathSegments]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showErrorsPopover) {
      timer = setTimeout(() => {
        setShowErrorsPopover(false);
      }, 2500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showErrorsPopover]);

  useEffect(() => {
    const editor = editorRef.current;
    setValue(t(`${PlaceHolder[mode as keyof typeof PlaceHolder]}`));
    if (editor) {
      editor.focus();
    }
  }, [mode, t]);

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
  }, [onBlur]);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleChange = (value?: string) => {
    if (value) {
      setShowErrorsPopover(false);
      setValue(value);
    }
  };

  return (
    <Paper sx={{ width: '100%', minHeight: '60svh', position: 'relative' }}>
      {showErrorsPopover && <ErrorsMessage errorMessage={errorMessage} />}
      <Editor
        language={mode}
        height="65vh"
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        loading={t('Editor_Loading')}
      />
    </Paper>
  );
}
