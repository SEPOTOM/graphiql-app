'use client';

import Paper from '@mui/material/Paper';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import {
  BodyType,
  PlaceHolder,
  SegmentIndex,
  EditorOptions,
  HeadersAndVariablesEditorRowDataItem,
  StorageKey,
} from '@/types';
import { encodeToBase64, getNewBodyPath } from '@/services';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLanguage, useTranslation, useLocalStorage } from '@/hooks';
import { ErrorsMessage } from '@/components';
import { Button } from '@mui/material';

export interface RequestBodyEditorProps {
  mode: string;
  options: EditorOptions;
  initialValue?: string;
}

export default function RequestBodyEditor({ mode, options, initialValue }: RequestBodyEditorProps) {
  const editorRef = useRef<Nullable<monaco.editor.IStandaloneCodeEditor>>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSegments = pathname.split('/');
  const { lng } = useLanguage();
  const { t } = useTranslation(lng);
  const [value, setValue] = useState<string>(initialValue ?? '');
  const [showErrorsPopover, setShowErrorsPopover] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [variables] = useLocalStorage<HeadersAndVariablesEditorRowDataItem[]>(StorageKey.Variables, []);

  const insertVariablesIntoBody = useCallback(
    (body: string) => {
      let updatedBody = body;
      variables.forEach(({ key, value, check }) => {
        if (check) {
          const regex = new RegExp(`{{${key}}}`, 'g');
          updatedBody = updatedBody.replace(regex, value);
        }
      });
      return updatedBody;
    },
    [variables]
  );

  useEffect(() => {
    setValue(insertVariablesIntoBody(initialValue || ''));
  }, [initialValue, variables, insertVariablesIntoBody]);

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
    const params = new URLSearchParams(searchParams.toString());
    if (options.readOnly) return;

    try {
      let bodyWithVariables = insertVariablesIntoBody(value);
      let encodedValue: string;
      if (mode === BodyType.json) {
        const parsedValue = JSON.parse(bodyWithVariables);
        encodedValue = encodeToBase64(JSON.stringify(parsedValue));
      } else {
        encodedValue = encodeToBase64(bodyWithVariables);
      }
      const newPath = `${getNewBodyPath(pathname, encodedValue)}?${params}`;
      window.history.replaceState(null, '', newPath);
    } catch (e) {
      if (e instanceof Error) {
        const newSegments = `${pathSegments.slice(0, SegmentIndex.Body).join('/')}?${params}`;
        window.history.replaceState(null, '', newSegments);
        setErrorMessage(`${t('json_error')}${e.message}`);
        setShowErrorsPopover(true);
      }
    }
  }, [mode, value, pathname, pathSegments, options.readOnly, insertVariablesIntoBody, searchParams, t]);

  useEffect(() => {
    if (options.readOnly) return;
    let timer: NodeJS.Timeout;
    if (showErrorsPopover) {
      timer = setTimeout(() => {
        setShowErrorsPopover(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showErrorsPopover, options.readOnly]);

  useEffect(() => {
    if (options.readOnly || initialValue) return;
    const editor = editorRef.current;
    setValue(t(`${PlaceHolder[mode as keyof typeof PlaceHolder]}`));
    if (editor) {
      editor.focus();
    }
  }, [mode, t, options.readOnly, initialValue]);

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
