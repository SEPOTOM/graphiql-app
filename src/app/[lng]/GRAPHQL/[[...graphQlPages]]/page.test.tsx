import { render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { Mock } from 'vitest';
import GraphQlClientPage from './page';
import { GraphQlDataProvider, LanguageProvider } from '@/contexts';
import { ReactNode } from 'react';

vi.mock('@/components/PrivateRoute/PrivateRoute', () => ({
  default: ({ children }: { children: ReactNode }) => {
    return children;
  },
}));

describe('GraphQlClientPage', () => {
  it('should  render page correctly', () => {
    (usePathname as Mock).mockReturnValue('GRAPHQL/en');
    const replace = vi.fn();
    (useRouter as Mock).mockImplementation(() => ({
      replace,
    }));
    render(
      <GraphQlDataProvider>
        <LanguageProvider lang="en">
          <GraphQlClientPage />
        </LanguageProvider>
      </GraphQlDataProvider>
    );
    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByLabelText('SDL URL')).toBeInTheDocument();
  });
});
