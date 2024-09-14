import { ReactNode } from 'react';
import { RenderOptions, RenderResult, render } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import { LanguageProvider } from '@/contexts';
import { fallbackLng } from '@/utils';

export const renderWithUser = (ui: ReactNode, renderOptions?: RenderOptions): RenderResult & { user: UserEvent } => {
  const user = userEvent.setup();
  return { user, ...render(ui, renderOptions) };
};

export const renderWithLng = (ui: ReactNode, renderOptions?: RenderOptions & { lng: string }): RenderResult => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <LanguageProvider lang={renderOptions ? renderOptions.lng : fallbackLng}>
        {renderOptions && renderOptions.wrapper ?
          <renderOptions.wrapper>{children}</renderOptions.wrapper>
        : children}
      </LanguageProvider>
    );
  };

  return render(ui, {
    ...renderOptions,
    wrapper: Wrapper,
  });
};
