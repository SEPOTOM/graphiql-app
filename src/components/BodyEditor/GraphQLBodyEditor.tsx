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

export default function GraphQLRequestBodyEditor({ mode, options, initialValue }: RequestBodyEditorProps) {
  const editorRef = useRef<Nullable<monaco.editor.IStandaloneCodeEditor>>(null);
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const lng = pathSegments.at(SegmentIndex.Language) ?? fallbackLng;
  const { t } = useTranslation(lng);
  const { setQueryText } = useGraphQl();
  const [value, setValue] = useState<string>(initialValue ?? '');
  const [showErrorsPopover, setShowErrorsPopover] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  const onBlur = useCallback(() => {
    if (options.readOnly) return;
    try {
      let encodedValue: string;
      if (mode === BodyType.json) {
        const parsedValue = JSON.parse(value);
        encodedValue = encodeToBase64(JSON.stringify(parsedValue));
      } else {
        encodedValue = encodeToBase64(value);
      }
      const newPath = getNewGraphQLBodyPath(pathname, encodedValue);
      window.history.replaceState(null, '', newPath);
    } catch (e) {
      if (e instanceof Error) {
        const newSegments = pathSegments.slice(0, 4);
        window.history.replaceState(null, '', newSegments.join('/'));
        setErrorMessage(`Invalid JSON: ${e.message}`);
        setShowErrorsPopover(true);
      }
    }
  }, [mode, value, pathname, pathSegments, options.readOnly]);

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
    setValue(t(`${PlaceHolder[mode as keyof typeof PlaceHolder]}`));
    setQueryText(t(`${PlaceHolder[mode as keyof typeof PlaceHolder]}`));
    if (editor) {
      editor.focus();
    }
    const pathNameFromUrl = pathname.split('/').at(4);
    if (pathNameFromUrl) {
      console.log('load');
      const encodedPathNameFromUrl = decodeFromBase64(pathNameFromUrl);
      setValue(encodedPathNameFromUrl);
      setQueryText(encodedPathNameFromUrl);
    }
  }, [mode, t, options.readOnly, setQueryText, pathname]);

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

  const handleChange = (value?: string) => {
    if (value) {
      setShowErrorsPopover(false);
      setValue(value);
      setQueryText(value);
    }
  };

  return (
    <Paper sx={{ width: '100%', position: 'relative' }}>
      {showErrorsPopover && <ErrorsMessage errorMessage={errorMessage} />}
      <Editor
        language={mode}
        height="41.6vh"
        width="100%"
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        loading={t('editor_loading')}
        options={options}
      />
    </Paper>
  );
}
