import { render, screen, waitFor } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import RestfullClientPage from './page';
import { LanguageProvider } from '@/contexts';

describe('RestfullClientPage', () => {
  it('should render component correctly', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/ru');
    const replace = vi.fn();
    (useRouter as Mock).mockImplementation(() => ({
      replace,
    }));
    const mockedSearch = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue(mockedSearch);

    render(
      <LanguageProvider lang="en">
        <RestfullClientPage />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Method')).toBeInTheDocument();
      expect(screen.getByLabelText('URL')).toBeInTheDocument();
    });
  });
});
