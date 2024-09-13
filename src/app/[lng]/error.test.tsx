import { render } from '@testing-library/react';

import { LanguageProvider } from '@/contexts';

import ErrorPage from './error';

describe('ErrorPage', () => {
  it('displays relevant content', async () => {
    const { findByRole, getByRole } = render(
      <LanguageProvider lang="en">
        <ErrorPage />
      </LanguageProvider>
    );

    expect(await findByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
});
