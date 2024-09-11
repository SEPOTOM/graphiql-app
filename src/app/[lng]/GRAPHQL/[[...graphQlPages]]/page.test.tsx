import { render, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import GraphQlClientPage from './page';
import { LanguageProvider } from '@/contexts';

describe('GraphQlClientPage', () => {
  it('should  render page correctly', () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL');
    const replace = vi.fn();
    (useRouter as Mock).mockImplementation(() => ({
      replace,
    }));
    const mockedSearch = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue(mockedSearch);
    render(
      <LanguageProvider lang="en">
        <GraphQlClientPage />
      </LanguageProvider>
    );
    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByLabelText('SDL URL')).toBeInTheDocument();
  });
});
