import { render, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import GraphQlClientPage from './page';
import { GraphQlDataProvider } from '@/contexts';

describe('GraphQlClientPage', () => {
  it('should  render page correctly', () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL');
    const replace = vi.fn();
    (useRouter as Mock).mockImplementation(() => ({
      replace,
    }));
    render(
      <GraphQlDataProvider>
        <GraphQlClientPage />
      </GraphQlDataProvider>
    );
    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByLabelText('SDL URL')).toBeInTheDocument();
  });
});
