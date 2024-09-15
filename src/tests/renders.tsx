import { ReactNode } from 'react';
import { RenderOptions, RenderResult, render } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import { LanguageProvider } from '@/contexts';
import { fallbackLng } from '@/utils';
import { Languages } from '@/types';

interface ExtendedRenderResult extends RenderResult {
  user: UserEvent;
}

interface ExtendedRenderOptions extends RenderOptions {
  lng?: Languages;
}

export const renderWithUser = (ui: ReactNode, renderOptions?: RenderOptions): ExtendedRenderResult => {
  const user = userEvent.setup();
  return { user, ...render(ui, renderOptions) };
};

export const renderWithLng = (ui: ReactNode, renderOptions?: ExtendedRenderOptions): RenderResult => {
  const CustomWrapper = renderOptions && renderOptions.wrapper;
  const lng = renderOptions && renderOptions.lng;

  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <LanguageProvider lang={lng ?? fallbackLng}>
        {CustomWrapper ?
          <CustomWrapper>{children}</CustomWrapper>
        : children}
      </LanguageProvider>
    );
  };

  return render(ui, {
    ...renderOptions,
    wrapper: Wrapper,
  });
};

export const renderWithUserAndLng = (ui: ReactNode, renderOptions?: ExtendedRenderOptions): ExtendedRenderResult => {
  const user = userEvent.setup();
  return { user, ...renderWithLng(ui, renderOptions) };
};
