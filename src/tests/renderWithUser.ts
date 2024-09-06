import { ReactNode } from 'react';
import { RenderOptions, RenderResult, render } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

export const renderWithUser = (ui: ReactNode, renderOptions?: RenderOptions): RenderResult & { user: UserEvent } => {
  const user = userEvent.setup();
  return { user, ...render(ui, renderOptions) };
};
