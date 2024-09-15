'use client';

import Paper from '@mui/material/Paper';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useCallback, useState } from 'react';
import * as monaco from 'monaco-editor';

import { PlaceHolder, SegmentIndex, EditorOptions } from '@/types';
import { decodeFromBase64, encodeToBase64, getNewBodyPath } from '@/services';
import { useTranslation } from '@/hooks';
import { fallbackLng } from '@/utils';
import { useGraphQl } from '@/contexts';
import { usePathname, useSearchParams } from 'next/navigation';

export interface RequestBodyEditorProps {
  mode: string;
  options: EditorOptions;
  initialValue?: string;
}

export default function GraphQlRequestBodyEditor({ mode, options, initialValue }: RequestBodyEditorProps) {
  const editorRef = useRef<Nullable<monaco.editor.IStandaloneCodeEditor>>(null);
  const searchParams = useSearchParams();
  const searchParamsUrl = searchParams.toString();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const lng = pathSegments.at(SegmentIndex.Language) ?? fallbackLng;
  const { t } = useTranslation(lng);
  const { queryText, setQueryText } = useGraphQl();
  const [newPathNameFromUrl, setNewPathNameFromUrl] = useState('');

  useEffect(() => {
    setQueryText(initialValue || '');
    const bodyFromUrl = pathname.split('/').at(SegmentIndex.Body);
    let encodedBodyFromUrl = t(`${PlaceHolder[mode as keyof typeof PlaceHolder]}`);
    if (bodyFromUrl) {
      encodedBodyFromUrl = decodeFromBase64(bodyFromUrl);
    }
    setQueryText(encodedBodyFromUrl);
  }, [initialValue, mode, pathname, setQueryText, t]);

  const onBlur = useCallback(() => {
    if (options.readOnly) return;
    try {
      const params = new URLSearchParams(searchParams.toString());
      const newPath =
        newPathNameFromUrl !== '' ? newPathNameFromUrl : getNewBodyPath(pathname, encodeToBase64(queryText));
      const newPathWithSearchParams = `${newPath}?${params}`;
      window.history.replaceState(null, '', newPathWithSearchParams);
    } catch (e) {
      if (e instanceof Error) {
        const newSegments = pathSegments.slice(0, SegmentIndex.Body);
        const newPathWithSearchParams = `${newSegments}?${searchParamsUrl}`;
        window.history.replaceState(null, '', newPathWithSearchParams);
      }
    }
  }, [options.readOnly, searchParams, newPathNameFromUrl, pathname, queryText, pathSegments, searchParamsUrl]);

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
    if (queryText === '') {
      const pathNameFromUrl = pathname.split('/');
      pathNameFromUrl.splice(4, 1);
      setNewPathNameFromUrl(pathNameFromUrl.join('/'));
    }
    if (queryText) {
      setQueryText(queryText);
      setNewPathNameFromUrl('');
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
