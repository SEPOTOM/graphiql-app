'use client';

import Paper from '@mui/material/Paper';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import { BodyType, PlaceHolder, SegmentIndex, EditorOptions } from '@/types';
import { decodeFromBase64, encodeToBase64, getNewBodyPath } from '@/services';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { fallbackLng } from '@/utils';
import { useGraphQl } from '@/contexts';

export interface RequestBodyEditorProps {
  mode: string;
  options: EditorOptions;
  initialValue?: string;
}

export default function GraphQlRequestBodyEditor({ mode, options, initialValue }: RequestBodyEditorProps) {
  const editorRef = useRef<Nullable<monaco.editor.IStandaloneCodeEditor>>(null);
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const lng = pathSegments.at(SegmentIndex.Language) ?? fallbackLng;
  const { t } = useTranslation(lng);
  const { queryText, setQueryText } = useGraphQl();

  useEffect(() => {
    setQueryText(initialValue || '');
    const pathNameFromUrl = pathname.split('/').at(4);
    let encodedPathNameFromUrl = t(`${PlaceHolder[mode as keyof typeof PlaceHolder]}`);
    if (pathNameFromUrl) {
      encodedPathNameFromUrl = decodeFromBase64(pathNameFromUrl);
    }
    setQueryText(encodedPathNameFromUrl);
  }, [initialValue, mode, pathname, setQueryText, t]);

  const onBlur = useCallback(() => {
    if (options.readOnly) return;
    try {
      const newPath = getNewBodyPath(pathname, encodeToBase64(queryText));
      window.history.replaceState(null, '', newPath);
    } catch (e) {
      if (e instanceof Error) {
        const newSegments = pathSegments.slice(0, SegmentIndex.Body);
        window.history.replaceState(null, '', newSegments.join('/'));
      }
    }
  }, [queryText, pathname, pathSegments, options.readOnly]);

  useEffect(() => {
    if (options.readOnly) return;
    const editor = editorRef.current;
    if (editor) {
      editor.focus();
    }
  }, [mode, t, options.readOnly]);

  useEffect(() => {
    if (options.readOnly) return;
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
  }, [onBlur, options.readOnly]);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    if (options.readOnly) return;
    editorRef.current = editor;
    editor.focus();
  };

  const handleChange = (queryText?: string) => {
    if (queryText) {
      setQueryText(queryText);
    }
  };

  return (
    <Paper sx={{ width: '100%', position: 'relative', padding: '10px' }}>
      <Editor
        language={mode}
        height="35vh"
        width="100%"
        value={queryText}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        loading={t('editor_loading')}
        options={options}
      />
    </Paper>
  );
}
