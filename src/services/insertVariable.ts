import { HeadersAndVariablesEditorRowDataItem } from '@/types';

export const insertVariablesIntoBody = (body: string, variables: HeadersAndVariablesEditorRowDataItem[]) => {
  let updatedBody = body;
  variables.forEach(({ key, value }) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    updatedBody = updatedBody.replace(regex, value);
  });
  return updatedBody;
};
