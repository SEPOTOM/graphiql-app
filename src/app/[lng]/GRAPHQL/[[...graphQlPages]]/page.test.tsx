import { screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import GraphQlClientPage from './page';
import { GraphQlDataProvider } from '@/contexts';
import { ReactNode } from 'react';
import { renderWithLng } from '@/tests';

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
    const mockedSearch = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue(mockedSearch);

    renderWithLng(
      <GraphQlDataProvider>
        <GraphQlClientPage />
      </GraphQlDataProvider>
    );

    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByLabelText('SDL URL')).toBeInTheDocument();
  });
});
