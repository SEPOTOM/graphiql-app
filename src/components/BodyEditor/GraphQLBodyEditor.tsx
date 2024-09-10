'use client';

import Paper from '@mui/material/Paper';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import { BodyType, PlaceHolder, SegmentIndex, EditorOptions } from '@/types';
import { decodeFromBase64, encodeToBase64, getNewGraphQLBodyPath } from '@/services';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { ErrorsMessage } from '@/components';
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
  const [showErrorsPopover, setShowErrorsPopover] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      let encodedValue: string;
      if (mode === BodyType.json) {
        const parsedValue = JSON.parse(queryText);
        encodedValue = encodeToBase64(JSON.stringify(parsedValue));
      } else {
        encodedValue = encodeToBase64(queryText);
      }
      const newPath = getNewGraphQLBodyPath(pathname, encodedValue);
      window.history.replaceState(null, '', newPath);
    } catch (e) {
      if (e instanceof Error) {
        const newSegments = pathSegments.slice(0, SegmentIndex.Body);
        window.history.replaceState(null, '', newSegments.join('/'));
        setErrorMessage(`Invalid GraphQL: ${e.message}`);
        setShowErrorsPopover(true);
      }
    }
  }, [mode, queryText, pathname, pathSegments, options.readOnly]);

  useEffect(() => {
    if (options.readOnly) return;
    let timer: NodeJS.Timeout;
    if (showErrorsPopover) {
      timer = setTimeout(() => {
        setShowErrorsPopover(false);
      }, 2500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showErrorsPopover, options.readOnly]);

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
      setShowErrorsPopover(false);
      setQueryText(queryText);
    }
  };

  return (
    <Paper sx={{ width: '100%', position: 'relative', padding: '10px' }}>
      {showErrorsPopover && <ErrorsMessage errorMessage={errorMessage} />}
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
