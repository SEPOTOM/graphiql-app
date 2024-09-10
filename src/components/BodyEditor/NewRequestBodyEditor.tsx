'use client';

import Paper from '@mui/material/Paper';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import { BodyType, PlaceHolder, SegmentIndex, EditorOptions } from '@/types';
import { decodeFromBase64, encodeToBase64, getNewBodyPath, getNewGraphQLBodyPath } from '@/services';
import { usePathname } from 'next/navigation';
import { useLanguage, useTranslation } from '@/hooks';
import { ErrorsMessage } from '@/components';
import { useGraphQl } from '@/contexts';
import { Button } from '@mui/material';

export interface RequestBodyEditorProps {
  mode: string;
  options: EditorOptions;
  initialValue?: string;
}

export default function NewRequestBodyEditor({ mode, options, initialValue }: RequestBodyEditorProps) {
  const editorRef = useRef<Nullable<monaco.editor.IStandaloneCodeEditor>>(null);
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [value, setValue] = useState<string>(initialValue ?? '');
  const { setQueryText } = useGraphQl();
  const [showErrorsPopover, setShowErrorsPopover] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setValue(initialValue || '');
    if (mode === BodyType.graphql) {
      const pathNameFromUrl = pathname.split('/').at(4);
      let encodedPathNameFromUrl = t(`${PlaceHolder[mode as keyof typeof PlaceHolder]}`);
      if (pathNameFromUrl) {
        encodedPathNameFromUrl = decodeFromBase64(pathNameFromUrl);
      }
      setQueryText(encodedPathNameFromUrl);
      setValue(encodedPathNameFromUrl);
    }
  }, [initialValue, mode, pathname, setQueryText, t]);

  const formatDocument = () => {
    if (options.readOnly) return;
    const editor = editorRef.current;
    if (editor) {
      const formatAction = editor.getAction('editor.action.formatDocument');
      if (formatAction) {
        formatAction.run();
      }
    }
  };

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
      const newPath =
        mode === BodyType.graphql ?
          getNewGraphQLBodyPath(pathname, encodedValue)
        : getNewBodyPath(pathname, encodedValue);
      window.history.replaceState(null, '', newPath);
    } catch (e) {
      if (e instanceof Error) {
        const newSegments = pathSegments.slice(0, SegmentIndex.Body);
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
    if (options.readOnly || initialValue) return;
    const editor = editorRef.current;
    setValue(t(`${PlaceHolder[mode as keyof typeof PlaceHolder]}`));
    if (mode === BodyType.graphql) {
      setQueryText(t(`${PlaceHolder[mode as keyof typeof PlaceHolder]}`));
    }
    if (editor) {
      editor.focus();
    }
  }, [mode, t, options.readOnly, initialValue, setQueryText]);

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
    const formatAction = editor.getAction('editor.action.formatDocument');
    if (formatAction) {
      formatAction.run();
    }
  };

  const handleChange = (value?: string) => {
    if (value) {
      setShowErrorsPopover(false);
      setValue(value);
      if (mode === BodyType.graphql) {
        setQueryText(value);
      }
    }
  };

  return (
    <Paper sx={{ width: '100%', position: 'relative', padding: '10px' }}>
      {showErrorsPopover && <ErrorsMessage errorMessage={errorMessage} />}
      <Editor
        language={mode}
        height="35vh"
        width="100%"
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        loading={t('editor_loading')}
        options={options}
      />
      {mode === BodyType.json && !options.readOnly && (
        <Button onClick={formatDocument}>{t('format_button_text')}</Button>
      )}
    </Paper>
  );
}
