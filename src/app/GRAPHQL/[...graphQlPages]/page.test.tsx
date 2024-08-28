import { render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { Mock } from 'vitest';
import GraphQlClientPage from './page';

describe('GraphQlClientPage', () => {
  it('should  render page correctly', () => {
    (usePathname as Mock).mockReturnValue('/GRAPHQL');
    const route = vi.fn();
    (useRouter as Mock).mockImplementation(() => ({
      route,
    }));
    render(<GraphQlClientPage />);
    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByLabelText('SDL URL')).toBeInTheDocument();
  });
});
